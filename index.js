import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
//const API_URL = "http://www.omdbapi.com/";
//const API_KEY = "edb51d36";
const API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const API_KEY = process.env.API_KEY;
console.log(process.env.API_KEY);

// const config = {
//     headers: { 
//         responseType: 'json',
//         Authorization: `Bearer ${API_KEY}` 
//     }
// };

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended:true }));

// app.get("/", async (req, res) => {
//     try {
//         const imdbID = 'tt3896198'; // Örnek bir film ID'si
//         const response = await axios.get(API_URL, {
//             params: {
//                 t: "interstellar",
//                 apikey: API_KEY
//             }
//         });
//         res.render("index.ejs", {content: response.data });
//         console.log(json(response.data));
//     } catch (error) {
//         res.status(500).json({ error: 'API isteği başarısız oldu.' });
//     }
// });

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                api_key: API_KEY
            }
        });
        const movies = response.data.results; // API'den gelen film verileri
        res.render('index.ejs', { movies });
    } catch (error) {
        res.status(500).json({ error: 'API isteği başarısız oldu.' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});