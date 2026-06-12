import jwt from "jsonwebtoken";
import User from "../models/user.js";


const auth = async(req,res,next) => {

    try{

        const token = req.cookies.token;
        
        const decoded = jwt.verify(
               token,
               process.env.JWT_SECRET || "secret123"
         );

         const user = await User.findById(
            decoded.userId
         );

         req.user = user;

         next();

    }catch(err){
        res.status(401).send("Please Login");
    }


};

export default auth;
