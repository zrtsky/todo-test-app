import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

import { connectMongo } from "api/app"
import { switchTodoStatus } from "api/queries/todos"

const app = nc<NextApiRequest, NextApiResponse>().use(connectMongo)

app.patch(async (req, res) => {
  try {
    const doc = await switchTodoStatus(req.query.id as string)
    res.status(200).json(doc)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default app
