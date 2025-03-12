import { MoodFood } from "../models/moodFood.js";
import { User } from "../models/User.js";
import CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { aiChat,getNearbyRestaurants, getMealTime } from "../utils/index.js";

export const recommendFood = async (req, res) =>{
    try {
        const userId = req.user.userId;
        console.log(userId);
        
        const {longitude, latitude, mood, user_context} = req.body
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
let systemPrompt = `You are a personalized food recommender.`
systemPrompt += ` You are provided with user details: ${user}, current time: ${mealTime}, moodFood history: ${moodFood}, location (longitude:${longitude}, latitude:${latitude}), and user context: ${user_context}.`
systemPrompt += ` Consider the user's BMI explicitly when making recommendations.`
systemPrompt += ` Focus on recommending primarily Indian foods.`
systemPrompt += ` Base the recommendations on these criteria and user's current mood:`
systemPrompt += ` 1. **Time & Weather-Based:** Suggest one Indian food item suitable for the current time and weather conditions.`
systemPrompt += ` 2. **History & BMI-Based:** Suggest one food item from the user's moodFood history, adjusted for their BMI to promote balanced eating.`
systemPrompt += ` 3. **BMI-Considered:** Suggest one additional food item, different from their moodFood history, tailored to complement their BMI and promote overall health.`
systemPrompt += ` Also, provide one drink or dessert recommendation based on the user description ${user_context} and must also compliment his/her ${user_context}.`
systemPrompt += ` You can be creative and give your personal recommendations.`
systemPrompt += ` Respond in JSON format, like this example:`
systemPrompt += `{`
systemPrompt += ` "systemMessage": "Here are some food recommendations tailored to your mood, the time of day, and your nutritional needs:",`
systemPrompt += ` "foods": [`
systemPrompt += ` {"1": "Food Name ", "reason": "Explanation of why this food is suitable for the current time ${mealTime} and weather."},`
systemPrompt += ` {"2": "Food Name ", "reason": "Explanation of why this food is chosen from their history, considering their BMI."},`
systemPrompt += ` {"3": "Food Name ", "reason": "Explanation of why this food is a good addition based on their BMI (mention high or low) and overall health."},`
systemPrompt += ` {"extra": "Food Name", "reason": " compliment about users like ohh that great!! ${user_context} and provide a good meal that enhances his mood."}`
systemPrompt += ` ]`
systemPrompt += `}`

let userPrompt = `I am feeling ${mood}. Provide me with 3 food items, Also suggest a suitable drink or dessert.`

let message = [
    {"role": "system", "content": systemPrompt},
    {"role": "user", "content": userPrompt}
]

        // console.log(message);
        const result = await aiChat(message)
        console.log(result);
        res.status(StatusCodes.OK).send(result)

    } catch (error) {
        res.status(StatusCodes.ERROR).json(error)
        
    }
}