import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner_id: {
      type: String,
      required: true,
    },
    likes: [{ type: String }],
    comments: [
      {
        user: {
          type: ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productsSchema);
