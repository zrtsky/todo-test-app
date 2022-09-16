import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { deleteTodoListById } from "api/queries/todos"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.delete(async (req, res) => {
  try {
    const doc = await deleteTodoListById(req.query.id as string)
    res.send(doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default app
