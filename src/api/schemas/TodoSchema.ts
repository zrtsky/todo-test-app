import { Schema, model, models, Model } from "mongoose"

import { Todo } from "types/todo"

type TodoDocument = Document & Todo

export const todoSchema = new Schema<TodoDocument>({
  title: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const TodoDB: Model<TodoDocument> = models.TodoDB || model("TodoDB", todoSchema)
