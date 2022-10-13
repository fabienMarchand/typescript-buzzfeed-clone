import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

const PORT = 8000;
const app = express();

app.get("/quiz-item", async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(
      "https://eb1eaad0-be07-4f89-87ee-41576e8e60ce-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/quizes/collections/quirkyQuizes",
      {
        headers: {
          "X-Cassandra-Token":
            "AstraCS:rPGPDxKZKfJDUNUUIcbXTrLX:c8b2133a2ae83bbf5c24c117f860c55057bd354783972e4069749252fbbaf03c",
          accept: "application/json",
        },
      }
    );
    if (response.status === 200) {
      const quizItem = await response.data.data['f09d123b-a423-44c3-a310-bd8ca6c6518c'];
      res.setHeader("Access-Control-Allow-Origin", "http://llocalhost:3000");
      res.send(quizItem);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log("server is running on port " + PORT));
