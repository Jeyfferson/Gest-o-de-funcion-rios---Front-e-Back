import express from "express";
import dotenv from "dotenv";
import employeeRouter from "./routes/employeeRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use('/funcionarios', employeeRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});