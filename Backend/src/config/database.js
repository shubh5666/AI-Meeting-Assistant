import dns from "dns"

import mongoose from 'mongoose';
dns.setServers(["8.8.8.8", "8.8.4.4"]);

  const connectDB = async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");

    }catch(err){

     console.log(err);

    }
};

export default connectDB;