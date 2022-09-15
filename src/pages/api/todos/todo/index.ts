import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { createTodo } from "api/queries/todos"
import { todoValidator } from "validators/todo"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.post(async (req, res) => {
  try {
    await todoValidator.validate(req.body)

    const doc = await createTodo(req.body)

    res.status(201).json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default app
