import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user detail from frontend
    const{username, fullname, email, password } = req.body

    // validation - if not empty
    if ([username, fullname, email, password].some((field) => field?.trim() === "") ) {
        throw new ApiError(400, "All fields are required")
    } 

    // check if user altready exists: username, email
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409, "user with email or username already exist")
    }

    // check for images , check for avatar (multer)
    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path
   
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // upload them to cloudinary check fir avatar in (cloudinary)
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from respone
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // check for user creation 
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.")
    }

    // return response 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

})


export {registerUser}