import * as yup from "yup"

export const todoValidator = yup.object().shape({
  title: yup.string().required(),
  todoListId: yup.string().required(),
})

export const todoListValidator = yup.object().shape({
  title: yup.string().required(),
})
