import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      // dbName: "cuvette",
      useNewUrlParser: true,
    };
    await mongoose.connect(process.env.MONGODB_URL, DB_OPTIONS);
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
