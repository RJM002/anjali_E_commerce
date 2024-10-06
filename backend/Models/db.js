const mongoose = require('mongoose');

const mongo_URL=process.env.MONGO_CONFIG;

mongoose.connect(mongo_URL)
    .then(()=>{
        console.log("Mongo DB Connection Successdully....");
    }).catch((err)=>{
        console.log("Mongo DB Failed to Connect",err)
    })