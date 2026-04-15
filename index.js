const express = require('express');
const cors = require('cors');
const app = express();
// const port = 2000;
const users =[]

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoute = require('./routes/user.route')
dotenv.config();

const port = process.env.port || 2000;
const URI = process.env.MONGODB_URI;

console.log("MongoDB URI loaded:", Boolean(URI));
console.log("App port:", port);

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log("Success! MongoDB is connected. ✅");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error: ❌");
    console.error(err);
    process.exit(1);
  });

// Mock Data
// const students = [
//     { Name: "john ola", Age: 20, Grade: 'A' },
//     { Name: "sola tun", Age: 25, Grade: 'B' },
//     { Name: "john peter", Age: 22, Grade: 'C' },
//     { Name: "tola ola", Age: 26, Grade: 'A' },
// ];

// Configuration & Middleware
app.set("view engine", "ejs")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// let customerSchema = mongoose.Schema({
//     firstName: {type:String, require:true },
//     lastName: {type:String, require:true },
//     email: {type:String, require:true,unique: [true,"Email has been taken please choose another one"] },
//     Password: {type:String, require:true },
// }) 

// const Customer = mongoose.model('user', customerSchema);




// Routes
// app.get('/home', (req, res) => {
//     res.send('welcome home');
// });

// app.get('/', (req, res) => {
//     // Ensure index.html exists in your root folder
//     res.sendFile(__dirname + "/index.html");
// });

// app.get('/signin', (req, res) => {
//     res.render("signin"); // You don't need the .ejs extension if view engine is set
// });

// app.get('/signup', (req, res) => {
//     res.render("signup");
// });

// app.post("/register", (req, res) => {
//     const user = req.body;
//     const newCustomer = new Customer(user);
//     console.log(
//         user
//     );
    

//     newCustomer.save()
//     .then((user)=>{
//         console.log("user saved",user);
//     res.send("Registration successful!"); // Added response to prevent hanging
        
        
//     })
//     .catch((err)=>{
//         console.error("error saving to db",err);
//     res.status(500).send("error" + err.message); // Added response to prevent hanging
        
//     })
    // users.push(user)
    // console.log(users);
    
    // console.log('User Data:', req.body);
    // res.send("Registration successful!"); // Added response to prevent hanging
// });

// app.get("/about", (req, res) => {
//     // Passing a hardcoded name or student data
//     res.render("index", { name: "Guest User" });
// });

// app.get("/students", (req, res) => {
//     res.json(students);
// });
app.use("/user", userRoute);

// Start Server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
