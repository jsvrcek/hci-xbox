import {OpenAI} from "openai";
import games_list from "../xbox_games.json" with {type: "json"};
import type {Game} from "../types.ts";
import fs from "node:fs";
import {getUniqueRandomIntegers} from "./random.ts";

export const groupedByCategory = games_list.reduce((acc, item) => {
    // If the category doesn't exist in the accumulator, create it as an array
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    // Push the current item into the corresponding category array
    acc[item.category].push(item);
    return acc;
}, {} as { [key: string]: Game[] });

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface GameCategoryResponse {
    categories: string[];
}

export async function getCategories(query: string): Promise<GameCategoryResponse> {
    const prompt = `
    I need help find xbox series x games relating to this query: "${query}", you need to search for games using the best category.
  `;

    try {
        console.log("SEARCHING CATEGORIES")
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {role: "system", content: "You are a helpful assistant."},
                {role: "user", content: prompt},
            ],
            tools: [{
                type: "function",
                function: {
                    name: "getGamesByCategory",
                    description: "Fetch a list of games.",
                    parameters: {
                        type: "object",
                        properties: {
                            categories: {
                                type: "array",
                                items: {
                                    type: "string",
                                    enum: Object.keys(groupedByCategory)
                                },
                            },
                        },
                        required: ["categories"],
                        additionalProperties: false
                    },
                    strict: true
                }
            }],
            store: true,
        });

        // Extract structured response
        console.log(response.choices[0].message.tool_calls[0])
        console.log(response.usage);
        const result = JSON.parse(response.choices[0].message.tool_calls[0]?.function.arguments || "categories: []");
        console.log(result)
        return result;
    } catch (error) {
        console.error("Error fetching data from OpenAI API:", error);
        return {categories: []};
    }
}

interface GameTitlesResponse {
    games: string[];
}

export async function searchGames(query: string, gameOptions: Game[]): Promise<GameTitlesResponse> {
    const prompt = `
    I need help find xbox series x games relating to this query: "${query}" for example if they ask for sports games, 
    you might return Madden Football, MLB.  If they ask for first person shooters you would return something like Call of Duty. 
    If they ask for kids games you might return Disney Dreamlight. 
  `;
    const random = getUniqueRandomIntegers(0, games_list?.length <100 ? games_list?.length: 50, 9)
    const games = random.map(i => gameOptions[i])
    console.log("asking about these games:", games)
    try {
        console.log("SEARCHING GAMES")
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {role: "system", content: "You are a helpful assistant."},
                {role: "user", content: prompt},
            ],
            tools: [{
                type: "function",
                function: {
                    name: "getGameTitles",
                    description: "Fetch a list of games.",
                    parameters: {
                        type: "object",
                        properties: {
                            gameTitles: {
                                type: "array",
                                items: {
                                    type: "string",
                                    enum: games
                                },
                            },
                        },
                        required: ["gameTitles"],
                        additionalProperties: false
                    },
                    strict: true
                }
            }],
            store: true,
        });

        console.log(response.choices[0].message.tool_calls[0])
        console.log(response.usage);
        const result = JSON.parse(response.choices[0].message.tool_calls[0]?.function.arguments || "games: []");
        console.log(result)
        return result;
    } catch (error) {
        console.error("Error fetching data from OpenAI API:", error);
        return {games: []};
    }
}

export async function uploadAudio(audioPath) {
    try {
        console.log("uploading audio", audioPath);
        const response = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioPath),
            model: "whisper-1",
            response_format: "text",
        });
        return {transcription: response}
    } catch (error) {
        console.error("Transcription error:", error);
    }
}