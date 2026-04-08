const Customer = require('../models/user.model');
const ejs = require  ('ejs')
const bcrypt = require("bcryptjs");
const { redirect } = require('express/lib/response');


const getSignup = (req, res)=>{
    res.render("signup");
}
const getSignin = (req, res) => {   
    res.render("signin");
}

const getDashboard = (req, res) => {
    res.render("dashboard");
}

const postSignup = (req, res) => {
    let salt =bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);


    req.body.password = hashedPassword;
    const user = req.body;
    const newCustomer = new Customer(user);
    // console.log(
        // user
    // );
    

    newCustomer.save()
    .then((user)=>{
        newCustomer.password = hashedPassword;
        console.log("user saved",user);
        res.redirect("/user/signin");
    // res.send("Registration successful!");
     // Added response to prevent hanging
    })
    .catch((err)=>{
        console.error("error saving to db",err);
    res.status(500).send("error" + err.message); // Added response to prevent hanging
        
    })
    // users.push(user)
    // console.log(users);
    
    // console.log('User Data:', req.body);
    // res.send("Registration successful!"); // Added response to prevent hanging
}


const postSignin = (req, res) => {
    const { email, password } = req.body;

    Customer.findOne({ email })
        .then((foundCustomers) => {
            if (!foundCustomers) {
                console.log("Invalid email");
                return res.status(400).json({message: "Invalid email or password"})
            } 
                console.log("Login Successful for", foundCustomers.email);
                const isMatch = bcrypt.compareSync(password, foundCustomers.password);

                if(!isMatch){
                    console.log("invalid password");
                    return res.status(400).json({message: "invalid email or password"});
                }



            res.redirect("/user/dashboard");

            
        })
        .catch((err) => {
            console.error("Error during signin:", err);
            res.status(500).send("Internal server error");
        });
}

module.exports = {postSignup, getSignup, postSignin, getSignin, getDashboard}