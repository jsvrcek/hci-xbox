import express from "express";
import cors from "cors";
import {getCategories, groupedByCategory, searchGames, uploadAudio} from "./utils/searchGames.ts";
import multer from "multer";
import * as fs from "node:fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const upload = multer({dest: 'uploads/'});
app.post("/api/search", async (req, res) => {
    const {search} = req.body;

    if (!search) {
        return res.status(400).json({error: "Missing 'search' field in request body"});
    }
    const {categories} = await getCategories(search)
    const categoryDedupe = [...new Set(categories)]
    console.log("Getting games for categories: ", categoryDedupe)
    const gameOptions = []
    for (const cat of categories.map(c => groupedByCategory[c])) {
        for (const game of cat) {
            gameOptions.push(game.title);
        }
    }
    const {gameTitles} = await searchGames(search, gameOptions);
    res.json({games: [...new Set(gameTitles)]});
});

app.post('/api/transcribe', upload.single('file'), async (req, res) => {
    const audioPath = req.file?.path;
    try {
        res.json(await uploadAudio(audioPath));
    } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({error: 'Failed to transcribe audio'});
    } finally {
        // Clean up the uploaded file
        if(audioPath) {
            fs.unlinkSync(audioPath);
        }
    }

});

app.listen(PORT, () => {
    console.log(`API is running at http://localhost:${PORT}`);
});
