import express from "express";
import cors from "cors";
import {getCategories, groupedByCategory, searchGames, uploadAudio} from "./utils/searchGames.ts";
import multer from "multer";
import * as fs from "node:fs";
import * as path from "node:path";

const app = express();
const PORT = 3000;

// Configure Multer storage
const storage = multer.diskStorage({
  destination: "uploads/", // Folder where files will be stored
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".webm"; // Preserve extension
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
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
    if (!req.file) {
      console.error(`No file was uploaded!`);
      res.status(400).json({ error: "No file uploaded" });
      return
    }
    const audioPath = req.file?.path;
    console.log("Got file", audioPath);
    const validExtensions = ["webm", "mp3", "wav", "ogg", "mp4"];
    const fileExtension = audioPath?.toString().split(".").pop();
    if (!fileExtension || fileExtension && !validExtensions.includes(fileExtension)) {
        console.error(`invalid file extension: ${fileExtension}`)
        res.status(400).json({ error: "Invalid file format" });
        return;
    } else{
        console.log(`Sending ${fileExtension} type file.`)
    }

    try {
        res.json(await uploadAudio(audioPath));
        return;
    } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({error: 'Failed to transcribe audio'});
    } finally {
        // Clean up the uploaded file
        if (audioPath) {
            fs.unlinkSync(audioPath);
        }
    }

});

app.listen(PORT, () => {
    console.log(`API is running at http://localhost:${PORT}`);
});
