
import Express from "express";
import http from 'http'
import axios from 'axios';
import cors from 'cors';

const app = Express();
const port = 3000;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors())


app.get("/search/:title", (req, res) => {    
    axios.get(`http://www.omdbapi.com/?apikey=862d9c24&s=${req.params.title}`)
        .then(response => res.json(response.data))
        .catch(err => console.log(err))
})

app.get("/getMovieFullDetails/:movieId", (req, res) => {    
    setTimeout(() => {
        axios.get(`http://www.omdbapi.com/?apikey=862d9c24&i=${req.params.movieId}`)
        .then(response => res.json(response.data))
        .catch(err => console.log(err))
    }, 1200);
    
});


app.post("/add", (req, res) => {
    console.log(req.body.id)
    res.send(200);
})

app.listen(port, () => console.log("listening on port " + port));
