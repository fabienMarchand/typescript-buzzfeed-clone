import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import * as dotenv from "dotenv";

import { QuizData } from "./interfaces";

dotenv.config();

const PORT = 8000;
const app = express();

app.get("/quiz-item", async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const response: AxiosResponse = await axios.get(process.env.URL, {
      headers: {
        "X-Cassandra-Token": process.env.TOKEN,
        accept: "application/json",
      },
    });
    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data[
        "f09d123b-a423-44c3-a310-bd8ca6c6518c"
      ];
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(quizItem);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log("server is running on port " + PORT));
