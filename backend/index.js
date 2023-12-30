import express, { request } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { SignUpInfo } from './models/signupModel.js'
dotenv.config();
const PORT = process.env.PORT
const MONGODBURL = process.env.MONGODBURL
const app = express();
app.use(express.json());
app.get('/', (request, response) => {
    response.send("Welcome to my Login and Registration Server");
})
//Signup logic
app.post('/signup', async (request, response) => {
    try {
        if (!request.body.name ||
            !request.body.email ||
            !request.body.password ||
            !request.body.phone ||
            !request.body.gender ||
            !request.body.hearAbout ||
            !request.body.city ||
            !request.body.state) {
            return response.send({
                message: "Send all required fields",
            });
        }
        else {
            const newUser = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone,
                gender: request.body.gender,
                hearAbout: request.body.hearAbout,
                city: request.body.city,
                state: request.body.state
            };
            const user = await SignUpInfo.create(newUser);
            return response.json(user);   //ToDo: Add HomeScreen Route

        }
    } catch (error) {
        console.log(`Error:${error}`);
        response.send(error.message);
    }
})
//Login Logic
app.post('/login',async(request,response)=>{
    try {
        const email=request.body.email
        const password=request.body.password
        console.log(`${email} and ${password}`);
        const userEmail=await SignUpInfo.findOne({email});
        if(userEmail.password===password){
            response.send("Successfully Logged In");
        }
        else{
            response.send("Invalid Credentials");  //TODO: Add HomeScreen Route
        }

    } catch (error) {
        console.log(`Error:${error}`);
        response.send("Invalid Login");
    }
})
mongoose.connect(MONGODBURL).then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error) => {
    console.log(`Error:${error}`);
})