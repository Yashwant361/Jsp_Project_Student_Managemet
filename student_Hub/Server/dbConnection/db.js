const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/std_Hub')
        console.log('Mongo Db connected');

    } catch (error) {
        console.log("Db not connected");

    }
}

module.exports = connectDb;