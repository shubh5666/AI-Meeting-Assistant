import  mongoose   from "mongoose";

const meetingSchema = new mongoose.Schema({
  
     title: {
        type: String,
        required: true
     },

     description: {
        type:String
     },

      audioFile: {
      type:String
     },
     transcript: {
      type: String
     },

     summary: {
      type: String
     },


     actionItems: {
      type: [String]
     },


     decisions: {
      type: [String]
     },

     followUps: {
      type: [String]
     },



     createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }

},{
    timestamps: true
}

);


const Meeting = mongoose.model(
    "Meeting", meetingSchema
);

export default Meeting;