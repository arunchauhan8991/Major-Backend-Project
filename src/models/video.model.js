import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, // cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },
    title: {
      type: String, 
      required: true,
    },
    description: {
      type: String, 
      required: true,
    },
    duration: {
        type: Number, // from cloudinary 
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)  //Enables pagination in aggregation queries
//[ AGGREGATION PIPELINE ? ] => to perform advanced data processing, analytics, or transformations that go beyond simple .find() queries.

export const Video = new mongoose.model("Video", videoSchema)