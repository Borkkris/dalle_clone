import mongoose from "mongoose";

// this option is usefull when working with the searchfunction
const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    // connects the Database
    mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}

export default connectDB