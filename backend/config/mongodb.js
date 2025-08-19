import mongoose from 'mongoose';

const connectDb = async ()=>{

    mongoose.connection.on('connected', ()=>console.log("database coonected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/mernauth`)
};

export default connectDb;