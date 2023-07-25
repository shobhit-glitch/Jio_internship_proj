const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public/uploads"));

// mongoose.connect("mongodb+srv://shobhitsinghid:xqmk8WYTvdmZfA92@cluster0.2qxpaq3.mongodb.net/jiomain")

// const MONGODB_URI = 'mongodb+srv://shobhitsinghid:xqmk8WYTvdmZfA92@cluster0.2qxpaq3.mongodb.net/?retryWrites=true&w=majority';

const MONGODB_URI = 'mongodb+srv://shobhitsinghid:xqmk8WYTvdmZfA92@cluster0.2qxpaq3.mongodb.net/jiomain';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


// //creating a data schema 
// const notesSchema = new mongoose.Schema({
//     //photo: String,
//     name: {
//         type: String,
//         required: true,
//     },
//     // name: String,
//     // dateOfBirth: Date,
//     dateofbirth: {
//         type: Date,
//         required: true,
//     },
//     // gender: String,
//     gender: {
//         type: String,
//         required: true,
//     },
//     // nationality: String,
//     Nationality:{
//         type: String,
//         required: true,
//     },
//     // address: String,
//     Address :{
//         type: String,
//         required: true,
//     },
//     // phone: String,
//     phone :{
//         type: Number,
//         required: true,

//     },
//     // email: String,
//     email :{
//         type: String,
//         required: true,
//     },
//     // school: String,
//     school :{
//         type: String,
//         required: true,
//     },
//     // graduationYear: String,
//     gyear :{
//         type : Number,
//         required : true,
//     },
//     // percentage: Number,
//     Percentage :{
//         type :Number,
//         required : true,
//     },
//     // achievements: String,
//     Achievements :{
//         type: String,
//         required: false,
//     },
//     // programme: String,
//     programme :{
//         type: String,
//         required: true,
//     },
//     // course: String,
//     course :{
//         type: String,
//         required: true,
//     },
//     // statementOfPurpose: String
//     answer1 :{
//         type: String,
//         required: true,
//     },
//     //future
//     answer2 :{
//         type: String,
//         required: true,
//     },

// });
const notesSchema ={
    name: String,
    dateofbirth: Date,
    gender: String,
    Nationality: String,
    Address: String,
    phone: Number,
    email : String,
    school: String,
    gyear : Number,
    Percentage : Number,
    Achievements : String,
    programme: String,
    course: String,
    answer1 : String,
    answer2 : String,
    image: String,


}

const Note = mongoose.model("Note",notesSchema);


// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "image-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload =multer({ storage: storage});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/",upload.single("image"), function(req, res) {
    let newNote = new Note({
        name: req.body.name,
        dateofbirth: req.body.dateofbirth,
        gender: req.body.gender,
        Nationality: req.body.Nationality,
        Address : req.body.Address,
        phone : req.body.phone,
        email : req.body.email,
        school : req.body.school,
        gyear : req.body.gyear,
        Percentage : req.body.Percentage,
        Achievements : req.body.Achievements,
        programme : req.body.programme,
        course : req.body.course,
        answer1 : req.body.answer1,
        answer2 : req.body.answer2,
        image: req.file ? req.file.filename : "",
        
    });
    newNote.save();
    res.redirect('/');

})

app.listen(3000, function(){
    console.log("server is running on 3000");
})
