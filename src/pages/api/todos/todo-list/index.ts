import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { createTodoList } from "api/queries/todos"
import { todoListValidator } from "validators/todo"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.post(async (req, res) => {
  try {
    await todoListValidator.validate(req.body)

    const doc = await createTodoList(req.body)
    res.status(201).send(doc)
  } catch (error) {
    res.status(400).send(error)
  } finally {
  }
})

export default app
