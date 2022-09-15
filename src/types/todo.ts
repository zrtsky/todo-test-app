export enum TODO_STATE {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
}

export type TodoStatus = keyof typeof TODO_STATE

export interface Todo {
  _id: string
  title: string
  status: TodoStatus
  createdAt: Date
}

export interface TodoList {
  _id: string
  title: string
  todos: Todo[]
  createdAt: Date
}

export interface TodoCreateRequest {
  title: string
  todoListId: string
}

export interface TodoListCreateRequest {
  title: string
}
