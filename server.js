const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
//<--------------------------------------------------------------------------------------------------->
// Connect to MongoDB
mongoose.connect( 
  "mongodb+srv://jenish1234:jenish_1234@todo.8jbdgxm.mongodb.net/demo2",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//<--------------------------------------------------------------------------------------------------->
// Define a user model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

//<--------------------------------------------------------------------------------------------------->
// Middleware
app.use(bodyParser.json());
// app.use(cors());
const corsOptions = {
    origin: ['https://mern-signup-backend.vercel.app/','htthttp://localhost:3000/register'], // Replace with your Vercel app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
  };
app.use(cors(corsOptions));

//<--------------------------------------------------------------------------------------------------->
// Registration API endpoint
app.post("/register", async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  const username = user.username;
  user.password = req.body.password;

  // Check if the username already exists in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    // User already exists, return a response
    console.log("Username already exists");
    return res
      .status(409)
      .json({ message: `Username '${username}' already exists` });
  } else {
    // User does not exist, create a new user
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
  }
});

//<--------------------------------------------------------------------------------------------------->
//fetch or get data from backend
app.get("/register", async (req, res) => {
  try {
    // Fetch user data from the database
    const docs = await User.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//<--------------------------------------------------------------------------------------------------->
app.get('/',(req,res)=>{
  res.send("Hey its working");
})

//<--------------------------------------------------------------------------------------------------->
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
