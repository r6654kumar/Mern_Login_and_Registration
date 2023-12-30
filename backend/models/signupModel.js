import mongoose from 'mongoose'
const signupSchema=mongoose.Schema({
        name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z\s]*$/, // Alphabets only
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Alphanumeric only
      },
      password: {
        type: String,
        required: true, // Alphanumeric only
      },
      phone: {
        type: Number,
        required: true,
        validate: /^[0-9]+$/, // Numbers only
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true,
      },
      hearAbout: {
        type: String, // Array of strings
        enum: ['LinkedIn', 'Friends', 'Job Portal', 'Others'],
        required: true,
      },
      city: {
        type: String,
        required: true,
        validate: /^[a-zA-Z\s]*$/, // Alphabets only
      },
      state: {
        type: String,
        required: true,
        validate: /^[a-zA-Z\s]*$/, // Alphabets only
      },
    });
export const SignUpInfo=mongoose.model('signup',signupSchema);