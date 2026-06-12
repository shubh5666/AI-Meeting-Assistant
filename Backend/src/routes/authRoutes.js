import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import auth from "../middleware/auth.js";

 const authRouter = express.Router();



authRouter.post('/signup', async(req,res) => {

    // check the user exist in database or not 
    try{
      const existingUser = await User.findOne({
          email: req.body.email
      });


        if(existingUser!= null){
          return res.status(409).send("User already exists");
        }

     // hash password
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          10
        );
     
        // create a user object 
        const user = new User({
          name : req.body.name,
          email: req.body.email,
          password: hashedPassword
        });
          // so till here user exist only in RAM not in MongoDB 



          // but know after await user.save() data in inserted successfully.
        await user.save();
        res.status(201).send("User signup successfull");

      }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
      }

       
});


// login

authRouter.post('/login', async(req,res) => {
        try{
          const user = await User.findOne({
          email: req.body.email

          });
          if(!user){
            return res.status(404).send("Invalid Credentials");
          }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

         if(!isPasswordValid){
          return res.status(400).send("Invalid Credentials");
         }

      

         const token = jwt.sign(
               {userId : user._id},
                process.env.JWT_SECRET
         );
            
         res.cookie("token",token);
         res.send("Login Successful");



        } catch(err){
          console.log(err);
          res.status(500).send("Something went wrong");
        }


});

// get profile

authRouter.get('/profile',auth, async(req,res)  => {
      
        res.send(req.user);
       
});

authRouter.post("/logout", (req, res) => {

    res.clearCookie("token");

    res.send("Logout Successful");

});

export default authRouter;



