//dependecies
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');

//app
const app = express();
const PORT = process.env.PORT || 3000;
const NYT_API_KEY = process.env.NYT_API_KEY;

//set up EJS engine
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//Create a Home route
app.get('/', (req,res) => {
    //res.send('Welcome to backend')
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=${NYT_API_KEY}`)
    .then(response => {
        if(response.status === 200) {
            let len = response.data.results.length
            for(let i = 0; i < len; i++){
                let movieResultObject = response.data.results[i];

                const finalObject = {
                    title : movieResultObject.display_title,
                    byline: movieResultObject.byline,
                    headline: movieResultObject.headline,
                    date: movieResultObject.publication_date,
                    url: movieResultObject.link.url
                }
                console.log(finalObject);
            }
          
        }
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})