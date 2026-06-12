import express from "express";
  import Meeting from "../models/meeting.js";
  import auth from "../middleware/auth.js";
  import upload from "../middleware/uploads.js";
  

  const meetingRouter = express.Router();

   // create a new meetings

meetingRouter.post('/meetings', auth,async(req,res) => {

  try{

       console.log(req.body);

     const meeting = new Meeting({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user._id
     });

       await meeting.save();

       res.status(201).send(meeting);

    } catch(err){
      console.log(err);
      res.status(500).send(
        "Something went wrong"
      );
    }


});


    // give all the meetings
 meetingRouter.get('/meetings', auth,async(req,res) => {
       try{
            const meetings = await Meeting.find({
              createdBy: req.user._id
            });

            res.send(meetings);

          }  catch(err){
            console.log(err);
            res.status(500).send("Somthing went wrong");
          }

  });

  // get one specific meetings
  meetingRouter.get('/meetings/:id',auth,async(req,res) => {
     
    try{
      const meeting = await Meeting.findById(
        req.params.id
      );
      if(!meeting){
        return res.status(404).send("Meeting not found");
      }

      res.send(meeting);

    }  catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
    }

  });



  //  update on exicting  meetings
     meetingRouter.patch('/meetings/:id',auth,async(req,res) => {
       
      try{

        const meeting = await Meeting.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!meeting){
          return res.status(400).send("Meeting not found");
        }

        res.send(meeting);
      

      }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
      }

     });


      // delete meeting

      meetingRouter.delete('/meetings/:id',auth,async(req,res) => {

        try{
    
           const meeting = await Meeting.findByIdAndDelete(
            req.params.id
           );

           if(!meeting){
            return res.status(404).send("Meeting not found");
           }

            res.send("Meeting deleted successfully");



        }catch(err){
          console.log(err);
          res.status(500).send("Something went wrong");
        }
      });


  // upload audio
      meetingRouter.post('/meetings/:id/upload',auth,
    upload.single('audio'),
    async(req,res) => {

        try{

            const meeting = await Meeting.findById(
                req.params.id
            );

            if(!meeting){
                return res.status(404).send(
                    "Meeting not found"
                );
            }


            console.log(req.file);
            meeting.audioFile = req.file.path;

            await meeting.save();

            res.send({
                message: "Audio uploaded successfully",
                filePath: req.file.path
            });

        }catch(err){

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);



      export default meetingRouter;