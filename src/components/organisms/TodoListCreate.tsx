import { FC } from "react"

import { Button, Card, Input, Loading, styled, Text } from "@nextui-org/react"
import { useForm } from "react-hook-form"

import { useAddTodoListMutation, useGetAllTodosQuery } from "services"

const StyledForm = styled("form", {
  maxWidth: 500,
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
})

const classes = {
  input: { width: "100%", marginBottom: 16 },
  submitButton: { width: "100%" },
  card: { background: "transparent", marginTop: 36, marginBottom: 60 },
  title: { textAlign: "center" },
}

export const TodoListCreate: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  })

  const [addTodoList, { isLoading }] = useAddTodoListMutation()
  const { refetch, isFetching } = useGetAllTodosQuery(null)

  const submitForm = async ({ title }: { title: string }) => {
    try {
      await addTodoList({ title })
      refetch()
      reset()
    } catch (error) {}
  }

  const isLoadingAll = isFetching || isLoading
  return (
    <Card css={classes.card}>
      <Text h1 css={classes.title}>
        ✅ <br />
        TODO App
      </Text>
      <StyledForm onSubmit={handleSubmit(submitForm)}>
        <Input
          {...register("title", { required: true })}
          id="input"
          size="xl"
          aria-label="Create todo list"
          placeholder="Crate Todo List"
          css={classes.input}
          status={errors.title ? "error" : "default"}
          disabled={isLoadingAll}
          contentRight={isLoadingAll && <Loading size="xs" />}
        />
        <Button disabled={isLoadingAll} type="submit" css={classes.submitButton} size="lg">
          Create
        </Button>
      </StyledForm>
    </Card>
  )
}
