const mongoose = require('mongoose');
require('dotenv').config();
const mongourl = process.env.MONGO_URI;

const mongodb = async () => {
    try {
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const data=await fetched_data.find({}).toArray() 
        const catdata = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategory = catdata;
    }
    catch (err) {
        console.error("Error during MongoDB operation:", err);
    }
};

module.exports = mongodb;
