import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { getAllTodoLists } from "api/queries/todos"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.get(async (_, res) => {
  try {
    const data = await getAllTodoLists()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default app
