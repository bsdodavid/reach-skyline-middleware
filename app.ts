import type { Request, Response } from "express";
import writeToFile from './functions/fileHandling.ts';
import {fetchFile} from "./functions/fileHandling.ts";
import express from 'express';
import cors from "cors";

const app = express();
app.use(cors());            // if frontend is different port
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const port = 3000;

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.post('/save-user', (req:Request, res:Response) => {
  console.log("req:", req.body);
  writeToFile(req.body);
  res.status(200).send("User saved successfully");
})

app.get('/get-user', (req:Request, res:Response) => {
  const userResp = fetchFile();
  if(!userResp || userResp.length===0){
    res.send("failed to fetch data or no data available.");
  }
  res.status(200).send(JSON.stringify({users:userResp}));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((req, res) => {
  res.status(404).send("Route not found");
});