
import { FoodItems } from '../models/foodItems.js';



// Your 100 food items array (paste the full JSON array here)
const seedData = [
    {
      "name": "Chicken Biryani",
      "quantity": "1 plate (250g)",
      "calories": 500,
      "protein": 20,
      "fat": 18,
      "carbs": 60,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Biryani_Home.jpg"
    },
    {
      "name": "Masala Dosa",
      "quantity": "1 piece (100g)",
      "calories": 150,
      "protein": 4,
      "fat": 5,
      "carbs": 22,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Masala_Dosa.jpg"
    },
    {
      "name": "Paneer Tikka",
      "quantity": "6 pieces (150g)",
      "calories": 250,
      "protein": 15,
      "fat": 18,
      "carbs": 8,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paneer_Tikka_%28Cottage_Cheese%29.jpg"
    },
    {
      "name": "Dal Tadka",
      "quantity": "1 bowl (200g)",
      "calories": 200,
      "protein": 10,
      "fat": 8,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Dal_Tadka.jpg"
    },
    {
      "name": "Aloo Paratha",
      "quantity": "1 piece (120g)",
      "calories": 300,
      "protein": 8,
      "fat": 12,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Aloo_Paratha.jpg"
    },
    {
      "name": "Rajma Chawal",
      "quantity": "1 plate (300g)",
      "calories": 400,
      "protein": 12,
      "fat": 10,
      "carbs": 65,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Rajma_Chawal.jpg"
    },
    {
      "name": "Dhokla",
      "quantity": "2 pieces (100g)",
      "calories": 120,
      "protein": 5,
      "fat": 2,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Khaman_Dhokla.jpg"
    },
    {
      "name": "Butter Chicken",
      "quantity": "1 bowl (200g)",
      "calories": 450,
      "protein": 25,
      "fat": 30,
      "carbs": 15,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Butter_Chicken.jpg"
    },
    {
      "name": "Idli-Sambar",
      "quantity": "2 idlis + sambar (150g)",
      "calories": 150,
      "protein": 6,
      "fat": 3,
      "carbs": 28,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Idli_Sambar.jpg"
    },
    {
      "name": "Pani Puri",
      "quantity": "6 pieces (50g)",
      "calories": 50,
      "protein": 1,
      "fat": 2,
      "carbs": 8,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Pani_Puri_03.jpg"
    },
    {
      "name": "Palak Paneer",
      "quantity": "1 bowl (200g)",
      "calories": 300,
      "protein": 14,
      "fat": 20,
      "carbs": 12,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/57/Palak_Paneer.jpg"
    },
    {
      "name": "Chole Bhature",
      "quantity": "1 plate (300g)",
      "calories": 600,
      "protein": 10,
      "fat": 25,
      "carbs": 80,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Chole_Bhature_from_Nagpur.jpg"
    },
    {
      "name": "Upma",
      "quantity": "1 bowl (150g)",
      "calories": 200,
      "protein": 5,
      "fat": 7,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/8/86/Upma.jpg"
    },
    {
      "name": "Rasgulla",
      "quantity": "2 pieces (100g)",
      "calories": 150,
      "protein": 4,
      "fat": 0,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/52/Rasgulla.jpg"
    },
    {
      "name": "Vada Pav",
      "quantity": "1 piece (150g)",
      "calories": 250,
      "protein": 6,
      "fat": 10,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Vada_Pav.jpg"
    },
    {
      "name": "Kheer",
      "quantity": "1 bowl (150g)",
      "calories": 300,
      "protein": 6,
      "fat": 10,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/41/Kheer_%28Rice_Pudding%29.jpg"
    },
    {
      "name": "Pav Bhaji",
      "quantity": "1 plate (300g)",
      "calories": 350,
      "protein": 8,
      "fat": 15,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Pav_Bhaji.jpg"
    },
    {
      "name": "Mutton Rogan Josh",
      "quantity": "1 bowl (200g)",
      "calories": 450,
      "protein": 30,
      "fat": 25,
      "carbs": 10,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Kashmiri_Rogan_Josh.jpg"
    },
    {
      "name": "Misal Pav",
      "quantity": "1 plate (250g)",
      "calories": 300,
      "protein": 10,
      "fat": 12,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Misal_Pav.jpg"
    },
    {
      "name": "Gajar ka Halwa",
      "quantity": "1 bowl (150g)",
      "calories": 350,
      "protein": 4,
      "fat": 15,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/58/Gajar_ka_halwa.jpg"
    },
    {
      "name": "Samosa",
      "quantity": "1 piece (50g)",
      "calories": 250,
      "protein": 3,
      "fat": 12,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Samosa.jpg"
    },
    {
      "name": "Gulab Jamun",
      "quantity": "2 pieces (80g)",
      "calories": 200,
      "protein": 2,
      "fat": 8,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/8/83/Gulab_jamun_%28Gibraltar%2C_November_2020%29.jpg"
    },
    {
      "name": "Jalebi",
      "quantity": "4 pieces (100g)",
      "calories": 300,
      "protein": 1,
      "fat": 10,
      "carbs": 55,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Jalebi_India.jpg"
    },
    {
      "name": "Dahi Puri",
      "quantity": "6 pieces (100g)",
      "calories": 150,
      "protein": 4,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Dahi_Puri_01.jpg"
    },
    {
      "name": "Bhelpuri",
      "quantity": "1 plate (150g)",
      "calories": 200,
      "protein": 3,
      "fat": 5,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Bhelpuri_02.jpg"
    },
    {
      "name": "Poha",
      "quantity": "1 plate (150g)",
      "calories": 250,
      "protein": 5,
      "fat": 7,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/45/Poha_Recipe.jpg"
    },
    {
      "name": "Malai Kofta",
      "quantity": "1 bowl (200g)",
      "calories": 400,
      "protein": 10,
      "fat": 25,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Malai_Kofta_Recipe.JPG"
    },
    {
      "name": "Hyderabadi Haleem",
      "quantity": "1 bowl (200g)",
      "calories": 350,
      "protein": 20,
      "fat": 15,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Hyderabadi_Haleem.jpg"
    },
    {
      "name": "Rasmalai",
      "quantity": "2 pieces (100g)",
      "calories": 200,
      "protein": 6,
      "fat": 8,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Rasmalai.jpg"
    },
    {
      "name": "Aloo Gobi",
      "quantity": "1 bowl (200g)",
      "calories": 150,
      "protein": 5,
      "fat": 6,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Aloo_gobi.jpg"
    },
    {
      "name": "Kadai Paneer",
      "quantity": "1 bowl (200g)",
      "calories": 300,
      "protein": 15,
      "fat": 20,
      "carbs": 15,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Kadai_Paneer.jpg"
    },
    {
      "name": "Medu Vada",
      "quantity": "2 pieces (100g)",
      "calories": 200,
      "protein": 5,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/07/Medu_Vada.JPG"
    },
    {
      "name": "Rava Kesari",
      "quantity": "1 bowl (100g)",
      "calories": 250,
      "protein": 2,
      "fat": 8,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/34/Kesari_bath.jpg"
    },
    {
      "name": "Chicken Tikka Masala",
      "quantity": "1 bowl (200g)",
      "calories": 400,
      "protein": 25,
      "fat": 22,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chicken_tikka_masala.jpg"
    },
    {
      "name": "Kulfi",
      "quantity": "1 piece (80g)",
      "calories": 200,
      "protein": 4,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/14/Kulfi%2C_India.jpg"
    },
    {
      "name": "Mysore Pak",
      "quantity": "2 pieces (80g)",
      "calories": 300,
      "protein": 2,
      "fat": 15,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/2/23/Mysore_Pak.JPG"
    },
    {
      "name": "Kachori",
      "quantity": "1 piece (50g)",
      "calories": 200,
      "protein": 4,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Kachori_02.jpg"
    },
    {
      "name": "Dosa",
      "quantity": "1 piece (70g)",
      "calories": 120,
      "protein": 3,
      "fat": 3,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/79/Dosa_at_Hotel_Saravana_Bhavan%2C_Chennai_%283%29.jpg"
    },
    {
      "name": "Thalipeeth",
      "quantity": "1 piece (100g)",
      "calories": 150,
      "protein": 5,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Thalipeeth_%28Spicy_Multi-grain_Pancake%29.jpg"
    },
    {
      "name": "Litti Chokha",
      "quantity": "2 pieces (150g)",
      "calories": 300,
      "protein": 8,
      "fat": 12,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Litti_Chokha.jpg"
    },
    {
      "name": "Ragi Mudde",
      "quantity": "2 balls (150g)",
      "calories": 200,
      "protein": 6,
      "fat": 2,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Ragi_Mudde.JPG"
    },
    {
      "name": "Sandesh",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 5,
      "fat": 6,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/15/Sandesh_%28Bengali_Sweet%29.jpg"
    },
    {
      "name": "Pesarattu",
      "quantity": "1 piece (100g)",
      "calories": 180,
      "protein": 6,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pesarattu.JPG"
    },
    {
      "name": "Thepla",
      "quantity": "2 pieces (80g)",
      "calories": 200,
      "protein": 5,
      "fat": 8,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Thepla.jpg"
    },
    {
      "name": "Undhiyu",
      "quantity": "1 bowl (200g)",
      "calories": 250,
      "protein": 8,
      "fat": 10,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Undhiyu.jpg"
    },
    {
      "name": "Patra",
      "quantity": "2 pieces (100g)",
      "calories": 120,
      "protein": 3,
      "fat": 4,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/13/Patra_Leaf_Roll.jpg"
    },
    {
      "name": "Chana Masala",
      "quantity": "1 bowl (200g)",
      "calories": 300,
      "protein": 12,
      "fat": 10,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chana_Masala_%28Spicy_Indian_Chickpea_Curry%29.jpg"
    },
    {
      "name": "Baingan Bharta",
      "quantity": "1 bowl (200g)",
      "calories": 150,
      "protein": 5,
      "fat": 8,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Baingan_Bharta.jpg"
    },
    {
      "name": "Papdi Chaat",
      "quantity": "1 plate (150g)",
      "calories": 250,
      "protein": 4,
      "fat": 10,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Papdi_Chaat.jpg"
    },
    {
      "name": "Kaju Katli",
      "quantity": "2 pieces (50g)",
      "calories": 200,
      "protein": 3,
      "fat": 12,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Kaju_Katli_%28Caju_sweet%29.jpg"
    },
    {
      "name": "Methi Thepla",
      "quantity": "2 pieces (80g)",
      "calories": 180,
      "protein": 5,
      "fat": 7,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Thepla.jpg"
    },
    {
      "name": "Ragi Dosa",
      "quantity": "1 piece (100g)",
      "calories": 120,
      "protein": 4,
      "fat": 2,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/11/Ragi_dosa.jpg"
    },
    {
      "name": "Shrikhand",
      "quantity": "1 bowl (100g)",
      "calories": 200,
      "protein": 6,
      "fat": 8,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shrikhand_with_Puri.jpg"
    },
    {
      "name": "Pongal",
      "quantity": "1 bowl (200g)",
      "calories": 250,
      "protein": 6,
      "fat": 8,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/03/Venn_Pongal.jpg"
    },
    {
      "name": "Bisi Bele Bath",
      "quantity": "1 plate (250g)",
      "calories": 350,
      "protein": 10,
      "fat": 12,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Bisi_Bele_Bath.JPG"
    },
    {
      "name": "Mysore Bonda",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 3,
      "fat": 8,
      "carbs": 18,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Mysore_Bonda.JPG"
    },
    {
      "name": "Kozhikode Biryani",
      "quantity": "1 plate (250g)",
      "calories": 450,
      "protein": 18,
      "fat": 20,
      "carbs": 55,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/08/Thalassery_Biryani.jpg"
    },
    {
      "name": "Khichdi",
      "quantity": "1 bowl (200g)",
      "calories": 200,
      "protein": 7,
      "fat": 5,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Khichdi.jpg"
    },
    {
      "name": "Mirchi Bajji",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 2,
      "fat": 10,
      "carbs": 15,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mirchi_Bajji.jpg"
    },
    {
      "name": "Chakli",
      "quantity": "10 pieces (50g)",
      "calories": 200,
      "protein": 3,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/13/Chakli_Indian_Snack.jpg"
    },
    {
      "name": "Kuzhi Paniyaram",
      "quantity": "6 pieces (100g)",
      "calories": 200,
      "protein": 5,
      "fat": 8,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kuzhi_Paniyaram.jpg"
    },
    {
      "name": "Soan Papdi",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 2,
      "fat": 6,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Soan_Papdi_Indian_Sweet.jpg"
    },
    {
      "name": "Puttu",
      "quantity": "1 plate (200g)",
      "calories": 250,
      "protein": 6,
      "fat": 2,
      "carbs": 55,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Puttu_with_Kadala_Curry.jpg"
    },
    {
      "name": "Appam",
      "quantity": "2 pieces (100g)",
      "calories": 150,
      "protein": 3,
      "fat": 2,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Appam_with_stew.JPG"
    },
    {
      "name": "Kadhi Pakora",
      "quantity": "1 bowl (200g)",
      "calories": 200,
      "protein": 6,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Kadhi_Pakora.jpg"
    },
    {
      "name": "Makki ki Roti & Sarson ka Saag",
      "quantity": "2 rotis + saag (300g)",
      "calories": 400,
      "protein": 12,
      "fat": 15,
      "carbs": 60,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Makki_ki_roti_%26_Sarson_ka_saag.jpg"
    },
    {
      "name": "Doodh Peda",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 3,
      "fat": 8,
      "carbs": 18,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Doodh_Peda.jpg"
    },
    {
      "name": "Khandvi",
      "quantity": "6 pieces (100g)",
      "calories": 120,
      "protein": 5,
      "fat": 4,
      "carbs": 18,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Khandvi.jpg"
    },
    {
      "name": "Mango Lassi",
      "quantity": "1 glass (250ml)",
      "calories": 200,
      "protein": 6,
      "fat": 5,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/95/Mango_Lassi_%28cropped%29.jpg"
    },
    {
      "name": "Aloo Tikki",
      "quantity": "2 pieces (100g)",
      "calories": 200,
      "protein": 4,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Aloo_Tikki_Chaat.jpg"
    },
    {
      "name": "Ragi Sangati",
      "quantity": "1 plate (200g)",
      "calories": 250,
      "protein": 6,
      "fat": 3,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Ragi_Sangati.JPG"
    },
    {
      "name": "Bhindi Masala",
      "quantity": "1 bowl (200g)",
      "calories": 150,
      "protein": 5,
      "fat": 8,
      "carbs": 15,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Bhindi_Masala.jpg"
    },
    {
      "name": "Pesarattu Upma",
      "quantity": "1 plate (200g)",
      "calories": 250,
      "protein": 7,
      "fat": 8,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pesarattu.JPG"
    },
    {
      "name": "Badam Halwa",
      "quantity": "1 bowl (100g)",
      "calories": 300,
      "protein": 5,
      "fat": 15,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Badam_Ka_Halwa.jpg"
    },
    {
      "name": "Chicken 65",
      "quantity": "1 plate (150g)",
      "calories": 300,
      "protein": 20,
      "fat": 18,
      "carbs": 10,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/38/Chicken_65_%28Dish%29.jpg"
    },
    {
      "name": "Dabeli",
      "quantity": "1 piece (100g)",
      "calories": 250,
      "protein": 5,
      "fat": 10,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/2/21/Dabeli.jpg"
    },
    {
      "name": "Puran Poli",
      "quantity": "1 piece (100g)",
      "calories": 250,
      "protein": 4,
      "fat": 8,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Puran_Poli.jpg"
    },
    {
      "name": "Kobbari Lauzu",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 2,
      "fat": 7,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Kobbari_Lauzu.jpg"
    },
    {
      "name": "Mysore Pak",
      "quantity": "2 pieces (80g)",
      "calories": 300,
      "protein": 2,
      "fat": 15,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/2/23/Mysore_Pak.JPG"
    },
    {
      "name": "Surali Wadi",
      "quantity": "4 pieces (100g)",
      "calories": 150,
      "protein": 5,
      "fat": 6,
      "carbs": 20,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Suralichi_Wadi.jpg"
    },
    {
      "name": "Pithla Bhakri",
      "quantity": "1 plate (200g)",
      "calories": 300,
      "protein": 10,
      "fat": 8,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pithla_Bhakri.jpg"
    },
    {
      "name": "Kori Rotti",
      "quantity": "1 plate (250g)",
      "calories": 400,
      "protein": 15,
      "fat": 20,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/35/Kori_Rotti.JPG"
    },
    {
      "name": "Kuzhi Paniyaram",
      "quantity": "6 pieces (100g)",
      "calories": 200,
      "protein": 5,
      "fat": 8,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kuzhi_Paniyaram.jpg"
    },
    {
      "name": "Bhatura",
      "quantity": "1 piece (80g)",
      "calories": 250,
      "protein": 5,
      "fat": 10,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Bhatura.jpg"
    },
    {
      "name": "Kadala Curry",
      "quantity": "1 bowl (200g)",
      "calories": 250,
      "protein": 10,
      "fat": 10,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Puttu_with_Kadala_Curry.jpg"
    },
    {
      "name": "Mangalorean Fish Curry",
      "quantity": "1 bowl (200g)",
      "calories": 300,
      "protein": 25,
      "fat": 15,
      "carbs": 10,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Mangalorean_Fish_Curry.jpg"
    },
    {
      "name": "Kulfi Falooda",
      "quantity": "1 glass (250ml)",
      "calories": 350,
      "protein": 6,
      "fat": 12,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kulfi_Falooda.jpg"
    },
    {
      "name": "Kadhi Chawal",
      "quantity": "1 plate (300g)",
      "calories": 350,
      "protein": 10,
      "fat": 12,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Kadhi_Pakora.jpg"
    },
    {
      "name": "Pesarattu",
      "quantity": "1 piece (100g)",
      "calories": 180,
      "protein": 6,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pesarattu.JPG"
    },
    {
      "name": "Kathi Roll",
      "quantity": "1 roll (150g)",
      "calories": 300,
      "protein": 12,
      "fat": 15,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Kathi_Roll.jpg"
    },
    {
      "name": "Sabudana Khichdi",
      "quantity": "1 plate (150g)",
      "calories": 200,
      "protein": 3,
      "fat": 5,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Sabudana_Khichdi.jpg"
    },
    {
      "name": "Khaman",
      "quantity": "2 pieces (100g)",
      "calories": 120,
      "protein": 5,
      "fat": 2,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Khaman_Dhokla.jpg"
    },
    {
      "name": "Chettinad Chicken",
      "quantity": "1 bowl (200g)",
      "calories": 400,
      "protein": 25,
      "fat": 20,
      "carbs": 15,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Chettinad_Chicken.jpg"
    },
    {
      "name": "Rava Laddu",
      "quantity": "2 pieces (50g)",
      "calories": 150,
      "protein": 2,
      "fat": 6,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Rava_Laddu.jpg"
    },
    {
      "name": "Kothu Parotta",
      "quantity": "1 plate (250g)",
      "calories": 450,
      "protein": 10,
      "fat": 25,
      "carbs": 50,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/96/Kothu_Parotta.jpg"
    },
    {
      "name": "Thayir Sadam",
      "quantity": "1 bowl (200g)",
      "calories": 200,
      "protein": 6,
      "fat": 5,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Thayir_Sadam_%28Curd_Rice%29.jpg"
    },
    {
      "name": "Chhena Poda",
      "quantity": "1 piece (100g)",
      "calories": 250,
      "protein": 8,
      "fat": 10,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Chhena_Poda.jpg"
    },
    {
      "name": "Naan",
      "quantity": "1 piece (90g)",
      "calories": 250,
      "protein": 6,
      "fat": 8,
      "carbs": 40,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/13/Butter_Naan.jpg"
    },
    {
      "name": "Dal Makhani",
      "quantity": "1 bowl (200g)",
      "calories": 350,
      "protein": 12,
      "fat": 20,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/77/Dal_Makhani.jpg"
    },
    {
      "name": "Gatte ki Sabzi",
      "quantity": "1 bowl (200g)",
      "calories": 300,
      "protein": 10,
      "fat": 15,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Gatte_ki_Sabzi.jpg"
    },
    {
      "name": "Kulfi",
      "quantity": "1 piece (80g)",
      "calories": 200,
      "protein": 4,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/1/14/Kulfi%2C_India.jpg"
    },
    {
      "name": "Tandoori Roti",
      "quantity": "1 piece (80g)",
      "calories": 150,
      "protein": 5,
      "fat": 3,
      "carbs": 30,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Tandoori_Roti.jpg"
    },
    {
      "name": "Mughlai Paratha",
      "quantity": "1 piece (150g)",
      "calories": 350,
      "protein": 10,
      "fat": 20,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Mughlai_Paratha.jpg"
    },
    {
      "name": "Batata Vada",
      "quantity": "2 pieces (100g)",
      "calories": 200,
      "protein": 4,
      "fat": 10,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Batata_Vada.jpg"
    },
    {
      "name": "Lassi",
      "quantity": "1 glass (250ml)",
      "calories": 150,
      "protein": 5,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/09/Lassi.jpg"
    },
    {
      "name": "Pesarattu",
      "quantity": "1 piece (100g)",
      "calories": 180,
      "protein": 6,
      "fat": 5,
      "carbs": 25,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Pesarattu.JPG"
    },
    {
      "name": "Malpua",
      "quantity": "2 pieces (100g)",
      "calories": 300,
      "protein": 3,
      "fat": 12,
      "carbs": 45,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Malpua.jpg"
    },
    {
      "name": "Kozhukattai",
      "quantity": "4 pieces (100g)",
      "calories": 200,
      "protein": 4,
      "fat": 5,
      "carbs": 35,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/2/25/Kozhukattai.jpg"
    },
    {
      "name": "Kothimbir Vadi",
      "quantity": "4 pieces (100g)",
      "calories": 150,
      "protein": 5,
      "fat": 8,
      "carbs": 18,
      "image_link": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Kothimbir_Vadi.jpg"
    }
  ]

export const seedDatabase = async () => {
  try {
    await FoodItem.deleteMany();
    console.log('🧹 Existing food items removed');
    
    const createdItems = await FoodItem.insertMany(seedData);
    console.log(`✅ ${createdItems.length} food items added successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};
