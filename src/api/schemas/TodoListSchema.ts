import { Schema, model, models, Model } from "mongoose"
import autoPopulate from "mongoose-autopopulate"

import { TodoList } from "types/todo"

type TodoListDocument = Document & TodoList

const todoListSchema = new Schema<TodoListDocument>({
  title: String,
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "TodoDB",
      autopopulate: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

todoListSchema.plugin(autoPopulate)

export const TodoListDB: Model<TodoListDocument> = models.TodoListDB || model("TodoListDB", todoListSchema)
