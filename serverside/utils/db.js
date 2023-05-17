import mongoose from "mongoose";

const mongodbConnection = async () => {
  const url = process.env.DB_URL;
  const connection = await mongoose.connect(url);
  try {
    if (connection) {
      console.log("database connected successfully");
    } else {
      console.log("database connection error");
    }
  } catch (error) {
    console.log("sth went wrong" + error);
    process.exit()
  }
};

export default mongodbConnection;
