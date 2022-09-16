import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { deleteTodoById, updateTodoTitle } from "api/queries/todos"
import { todoListValidator } from "validators/todo"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.delete(async (req, res) => {
  try {
    const doc = await deleteTodoById(req.query.id as string)
    res.send(doc)
  } catch (err) {
    res.status(400).json(err)
  }
})

app.patch(async (req, res) => {
  try {
    await todoListValidator.validate(req.body)

    const doc = await updateTodoTitle(req.query.id as string, req.body.title)
    res.status(200).json(doc)
  } catch (err) {
    res.status(400).json(err)
  }
})

export default app
