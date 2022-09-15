import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HTTPMethod } from "http-method-enum"

import { TODO_API, TODO_API_URL } from "config/routes"
import type { Todo, TodoCreateRequest, TodoList, TodoListCreateRequest } from "types/todo"

export const todosApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: TODO_API_URL }),
  endpoints: (builder) => ({
    getAllTodos: builder.query<TodoList[], null>({
      query: () => TODO_API.GET_TODO_LIST,
    }),
    deleteTodo: builder.mutation<string, string>({
      query: (id) => ({
        url: `${TODO_API.TODO}/${id}`,
        method: HTTPMethod.DELETE,
      }),
    }),
    addTodo: builder.mutation<TodoCreateRequest, { title: string; todoListId: string }>({
      query: (todo) => ({
        url: TODO_API.TODO,
        method: HTTPMethod.POST,
        body: todo,
      }),
    }),
    addTodoList: builder.mutation<TodoList, TodoListCreateRequest>({
      query: (todoList) => ({
        url: TODO_API.TODO_LIST,
        method: HTTPMethod.POST,
        body: todoList,
      }),
    }),
    deleteTodoList: builder.mutation<string, string>({
      query: (id) => ({
        url: `${TODO_API.TODO_LIST}/${id}`,
        method: HTTPMethod.DELETE,
      }),
    }),
    switchTodoCompleteStatus: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `${TODO_API.TODO_STATUS}/${id}`,
        method: HTTPMethod.PATCH,
      }),
    }),
    updateTodoTitle: builder.mutation<Todo, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `${TODO_API.TODO}/${id}`,
        method: HTTPMethod.PATCH,
        body: { title },
      }),
    }),
  }),
})

export const {
  useGetAllTodosQuery,
  useAddTodoListMutation,
  useAddTodoMutation,
  useDeleteTodoListMutation,
  useDeleteTodoMutation,
  useSwitchTodoCompleteStatusMutation,
  useUpdateTodoTitleMutation,
} = todosApi
