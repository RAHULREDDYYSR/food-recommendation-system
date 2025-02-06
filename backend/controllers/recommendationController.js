import { MoodFood } from "../models/moodFood.js";
import { User } from "../models/User.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { aiChat,getNearbyRestaurants, getMealTime } from "../utils/index.js";

export const recommendFood = async (req, res) =>{
    try {
        const userId = req.user.userId;
        const {longitude, latitude, mood} = req.body
        const user = await User.findById(userId);
        const moodFood = await MoodFood.findOne({user:userId});
        if(!moodFood){
            throw new CustomError("MoodFood not found", StatusCodes.NOT_FOUND);
        }
        
        const mealTime = getMealTime();
        let mealTimeString = `{
  "meals": {
    "breakfast": [
      {
        "name": "Idli-Sambar",
        "description": "Steamed rice cakes served with spicy lentil soup."
      },
      {
        "name": "Paratha",
        "description": "Stuffed flatbread, commonly served with yogurt or pickle."
      },
      {
        "name": "Poha",
        "description": "Flattened rice cooked with onions, peanuts, and spices."
      },
      {
        "name": "Dosa",
        "description": "Crispy rice crepe served with coconut chutney and sambar."
      },
      {
        "name": "Upma",
        "description": "Savory semolina porridge with vegetables and spices."
      }
    ],
    "lunch": [
      {
        "name": "Dal Rice",
        "description": "Lentil curry served with steamed rice."
      },
      {
        "name": "Chapati with Sabzi",
        "description": "Whole wheat flatbreads paired with vegetable stir-fry."
      },
      {
        "name": "Curd Rice",
        "description": "Rice mixed with yogurt and tempered spices."
      },
      {
        "name": "Biriyani/Pulao",
        "description": "Fragrant spiced rice dishes with vegetables or meat."
      },
      {
        "name": "Rajma-Chawal",
        "description": "Red kidney beans curry served with rice."
      }
    ],
    "evening_snacks": [
      {
        "name": "Pakoras",
        "description": "Deep-fried fritters made with vegetables or paneer."
      },
      {
        "name": "Samosa",
        "description": "Triangular pastry filled with spiced potatoes and peas."
      },
      {
        "name": "Chaat",
        "description": "Tangy and spicy street food like pani puri or bhel puri."
      },
      {
        "name": "Dhokla",
        "description": "Steamed savory cakes made from chickpea flour."
      },
      {
        "name": "Masala Chai & Biscuits",
        "description": "Spiced tea served with crunchy biscuits."
      }
    ],
    "dinner": [
      {
        "name": "Dal Tadka & Roti",
        "description": "Yellow lentil curry served with Indian flatbreads."
      },
      {
        "name": "Paneer Butter Masala with Naan",
        "description": "Rich paneer curry paired with naan bread."
      },
      {
        "name": "Vegetable Pulao",
        "description": "Aromatic rice with mixed vegetables and spices."
      },
      {
        "name": "Fish or Chicken Curry with Rice",
        "description": "Popular non-vegetarian dinner option in coastal regions."
      },
      {
        "name": "Khichdi",
        "description": "Comfort food made with rice, lentils, and mild spices."
      }
    ]
  }
}
`
        let systemPrompt = `you are personalized food recommender`
        systemPrompt += `you are provided with all the details of user: ${user}, current time: ${mealTime}`
        systemPrompt += `along with all the details of moodFood based on his history : ${moodFood}`
        systemPrompt += `and the location of the user longitude:${longitude} and latitude:${latitude} also provide one drink or dessert for the time. you can be creative and give yours
         personal recommendations other then his moodfood history, consider users BMI explicitly`
        systemPrompt +=`you can use only  1 food from users moodfood history,
         and other 2 food items  different from moodfood history, consider best indian foods for that time, examples like ${mealTimeString}`
        systemPrompt += "You should respond in JSON as in this example:"
        systemPrompt += `
    
        {"systemMessage": "Since you're feeling bored, here are three food items from your moodFood history that can help lift your spirits:",
        foods;[
            {"1":"Samosa","reason":"Crispy pastry filled with spiced potatoes and peas, perfect for munching"},
            {"2":"Dal Rice","reason":"Crunchy and flavorful, these bite-sized"},
            {"3":"Chapati with Sabzi","reason":"Flaky and savory, these fried breads "},
            {"extra":"Fruit Salad","reason":"Since you are 21 years old and weigh 70 kg, it might be beneficial to balance these indulgent snacks with something lighter.
            a **Fruit Salad** for its refreshing taste and balance of nutrients,
             which can also keep things interesting and healthy."}
    ]}`
        let userPrompt =  ` i am feeling ${mood}, provide me 3 food items 1 from my history moodfood and other 2 that best suites the time  `        
        let message = [
            {"role":"system","content":`${systemPrompt}`},
            {"role":"user","content":`${userPrompt}`}
        ]
        // console.log(message);
        const result = await aiChat(message)
        console.log(result);
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        res.status(StatusCodes.ERROR).json(error)
        
    }
}