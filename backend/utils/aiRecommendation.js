import { model } from "mongoose";
import OpenAI from "openai";



export const  aiChat = async (message) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: message
    });

    return response.choices[0].message.content;
}

// export const aiChat = async (system_message, user_prompt) => {
//     const ai = google.generativeai.GenetativeModel(
//         model_name="gemini-1.5-flash",
//         system_instructions = system_message
//     )
//     const response = await ai.generate_content(user_prompt)
//     return response.text
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const MODEL = "gemini-1.5-flash"; 
// export const aiChat = async (message) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: MODEL });
//         const result = await model.generateContent(message);
//         return result.response.text();
//     } catch (error) {
//         console.error(error);
        
//     }


