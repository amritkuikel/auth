import express from "express";
import mongodbConnection from "./utils/db.js";
import dotenv from "dotenv";
import router from "./routes/authroute.js";
import cors from "cors";

const app = express();
const PORT = 5000;

dotenv.config();
mongodbConnection();

app.use(cors());
app.use(express.json());
app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`);
});
