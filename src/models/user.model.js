import mongoose, { Schema }  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, // cloudinary url
    required: true,
  },
  coverImage: {
    type: String, // cloudinary url
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  refreshToken: {
    type: String
  }
},{
    timestamps: true
});


// This line registers a "pre-save hook" in Mongoose(mongoose MIDDLEWARE) 
// It tells Mongoose to run a certain function right before a document is saved to the MongoDB database using .save().
//we cant use arrow function bcoz we want context of the schema to encrypt password.
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);         
    next();

})

// we can make custom methods 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) 
    // will return true or false[compare PASSWORD(String) entered and stored (HASHED) password in data base]
}


userSchema.methods.generateAccessToken = function () {
    // jwt.sign() to generate a JWT token
    return jwt.sign(
      {
        _id: this._id,
        email: this.email, // these are payload
        username: this.userSchema,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET, // this is secret key
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // expiry of token
      }
    );
}


userSchema.methods.generateRefreshToken = function () {
     return jwt.sign(
       {
         _id: this._id, // Payload
       },
       process.env.REFRESH_TOKEN_SECRET, // this is secret key
       {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // expiry of token
       }
     );
}

export const User = mongoose.model("User", userSchema)