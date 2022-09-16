import { TodoDB, TodoListDB } from "api/schemas"
import { TodoCreateRequest, TodoListCreateRequest, TODO_STATE } from "types/todo"

export const getAllTodoLists = async () => {
  try {
    return await TodoListDB.find()
  } catch (error) {
    throw new Error("Error when get all TODO lists", { cause: error })
  }
}

export const getTodoById = async (id: string) => {
  try {
    return await TodoDB.findById(id)
  } catch (error) {
    throw new Error("Error when get TODO by id", { cause: error })
  }
}

export const deleteTodoById = async (id: string) => {
  try {
    await TodoDB.findByIdAndDelete(id)
    return "Success"
  } catch (error) {
    throw new Error("Error when delete TODO by id", { cause: error })
  }
}

export const switchTodoStatus = async (id: string) => {
  try {
    const todo = await TodoDB.findById(id)
    if (todo) {
      todo.status = todo.status === TODO_STATE.DONE ? TODO_STATE.IN_PROGRESS : TODO_STATE.DONE
      await todo.save()
      return todo
    }
    throw new Error("TODO not found")
  } catch (error) {
    throw new Error("Error, when try switch TODO status", { cause: error })
  }
}

export const createTodo = async ({ title, todoListId }: TodoCreateRequest) => {
  try {
    const todoList = await TodoListDB.findById(todoListId)
    if (todoList) {
      const todo = new TodoDB({ title, status: TODO_STATE.IN_PROGRESS })
      todoList.todos.push(todo)
      await todo.save()
      await todoList.save()
      return todo
    }
    throw new Error("TODO list not found")
  } catch (error) {
    throw new Error("Error when try to create new TODO", { cause: error })
  }
}

export const createTodoList = async ({ title }: TodoListCreateRequest) => {
  try {
    const todoList = new TodoListDB({ title })
    await todoList.save()

    return todoList
  } catch (error) {
    throw new Error("Error when try to create TODO lists", { cause: error })
  }
}

export const deleteTodoListById = async (id: string) => {
  try {
    await TodoListDB.findByIdAndDelete(id)
    return "Success"
  } catch (error) {
    throw new Error("Error when delete TODO list by id", { cause: error })
  }
}

export const updateTodoTitle = async (id: string, title: string) => {
  try {
    const todo = await TodoDB.findById(id)
    if (todo) {
      todo.title = title
      await todo.save()
      return todo
    }
    throw new Error("TODO not found")
  } catch (error) {
    throw new Error("Error when update TODO title", { cause: error })
  }
}
