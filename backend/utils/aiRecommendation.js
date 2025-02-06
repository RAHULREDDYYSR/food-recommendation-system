import { model } from "mongoose";
import OpenAI from "openai";



export const  aiChat = async (message) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: message,
        response_format: {"type":"json_object"}
    });

    const result = response.choices[0].message.content;
    return result;
}