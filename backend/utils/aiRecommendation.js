import { model } from "mongoose";
import OpenAI from "openai";


const restaurant_function = {
  "name": "get_nearby_restaurant",
  "description": "Get the price of a return ticket to the destination city. Call this whenever you need to know the location of restaurants, for example when a customer asks 'Where can i find this food Item?'",
  "parameters": {
      "type": "object",
      "properties": {
          "latitude": {
              "type": "integer",
              "description": "The latitude of the users location",
          },
          "longitude": {
              "type": "integer",
              "description": "The longitude of the users location",
          },
          "foodItem": {
              "type": "string",
              "description": "The foodItem that users wants",
          },

      },
      "required": ["latitude","longitude","foodItem"],
      "additionalProperties": false
  }
}


const tools = [{"type": "function", "function": restaurant_function}]

export const  aiChat = async (message) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: message,
        // tools:tools,
        response_format: {"type":"json_object"}
    });

    const result = response.choices[0].message.content;
    return result;
}