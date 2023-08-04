import express from 'express';

import userRouter from "./routes/routes.js"

const app = express();

app.use(express.json())

//aqui vão as rotas 

app.use("/users", userRouter)

app.listen(3000, () => console.log("servidor iniciou na porta 3000"))

