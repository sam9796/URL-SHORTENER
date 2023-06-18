const express = require('express');
const app = express();
const URL = require('./models/URL');
const shortid = require('shortid');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');


const buildPath=path.join(__dirname,"./client/build")
// Database Connect
connectDB();
// Body Parser Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.set('view engine', 'ejs');

// Security
app.use(cors());

// Middleware Setup
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get('host')}`;
  next();
});

// Clicks on ShortURLs
app.get('/:shortID', async (req, res) => {
  try {
    const { shortID } = req.params;
    let url = await URL.findOne({shortID:`http://localhost:8081/${shortID}`});
    if (!url) {
      return res.status(404).json({
        msg: 'No valid URLs found.',
      });
    }
    url.clicks++;
    await url.save();
    res.redirect(url.longURL);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Server Error',
    });
  }
});

//search api
app.post('/api/search',async (req,res)=>{
  try{
    const {toSearch}=req.body
    const searchResult=await URL.find({
      $or: [
        { "Note": { $regex: `${toSearch}`, $options: 'i' } },
        { "shortID": { $regex: `${toSearch}`, $options: 'i' } },
        { "longURL": { $regex: `${toSearch}`, $options: 'i' } }
      ]
  })
    return res.status(200).json({urls:searchResult})

  }catch(error){
    return res.status(500).json({urls:[]})
  }
})


//get all urls to paste on front-end
app.get('/api/getAllUrls',async (req,res)=>{
try{let all_urls=await URL.find()
res.json({urls:all_urls});}
catch(error){
  res.status(500).send("Internal Server Error")
}
})

// Create Short URL
app.post('/api/v2/shorten', async (req, res) => {
  try {
    const { longURL,note } = req.body;
    let url = await URL.findOne({longURL:longURL});
    if (url) {
      return res.status(200).json({
        ...url._doc,
        shortURL: `${url.shortID}`,
      });
    }
    url = await URL.create({
      longURL,
      shortID: `http://localhost:8081/${shortid.generate()}`,
      Note:note
    });

    res.status(200).json({
      ...url._doc,
      shortURL: `${url.shortID}`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: 'Server Error',
    });
  }
});

//Attaching build of the frontend
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Server PORT Setup
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
