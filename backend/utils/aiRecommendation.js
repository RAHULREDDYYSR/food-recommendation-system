import { model } from "mongoose";
import OpenAI from "openai";

const analyzeNutrition = async (foodItems) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const nutritionPrompt = `Analyze the nutritional content of these food items: ${foodItems.join(", ")}. 
    For each item provide a JSON object with:
    - calories
    - protein_g
    - carbohydrates_g
    - fat_g
    - fiber_g
    - key_vitamins_minerals
    - health_benefits
    
    Format your response as a valid JSON object with food names as keys.`;

    try {
        const nutritionResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Changed to gpt-3.5-turbo as fallback
            messages: [
                { role: "system", content: "You are a nutritional analysis expert. Always respond with valid JSON." },
                { role: "user", content: nutritionPrompt }
            ]
        });

        // Parse the response text as JSON
        try {
            return JSON.parse(nutritionResponse.choices[0].message.content);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            return {}; // Return empty object if parsing fails
        }
    } catch (error) {
        console.error('Nutrition Analysis Error:', error);
        return {}; // Return empty object on API error
    }
};

export const aiChat = async (message) => {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const systemMessage = message.find(msg => msg.role === "system");
        if (systemMessage) {
            systemMessage.content += "\nFormat your response as a valid JSON object.";
        }
        
        // First get food recommendations
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: message,
            temperature: 0.7,
            max_tokens: 1000
        });

        let recommendations;
        try {
            recommendations = JSON.parse(response.choices[0].message.content);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            throw new Error('Failed to parse AI response as JSON');
        }
        
        // Extract food items for nutrition analysis
        const foodItems = recommendations.foods.map(food => {
            if (food["1"]) return food["1"];
            if (food["2"]) return food["2"];
            if (food["3"]) return food["3"];
            if (food["extra"]) return food["extra"];
            return null;
        }).filter(Boolean);

        // Get nutritional analysis
        const nutritionData = await analyzeNutrition(foodItems);

        // Merge nutrition data with recommendations
        const enhancedRecommendations = {
            ...recommendations,
            foods: recommendations.foods.map(food => {
                const foodName = food["1"] || food["2"] || food["3"] || food["extra"];
                const nutrition = nutritionData[foodName] || {};
                return {
                    ...food,
                    nutrition: nutrition,
                    reason: `${food.reason}\n\nNutritional Benefits: This dish contains ${nutrition.calories || 'N/A'} calories, ${nutrition.protein_g || 'N/A'}g protein, and ${nutrition.carbohydrates_g || 'N/A'}g carbohydrates. ${nutrition.health_benefits || ''}`
                };
            })
        };

        return enhancedRecommendations;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        const errorResponse = {
            error: true,
            message: error.message,
            timestamp: new Date().toISOString(),
            user: 'RAHULREDDYYSR'
        };
        throw errorResponse;
    }
};