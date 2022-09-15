import React, { FC } from "react"

import { Button, Input, Loading, styled } from "@nextui-org/react"
import { useForm } from "react-hook-form"

interface CrateTodoFormProps {
  onSubmit: (title: string) => void
  isDisabled: boolean
}

const StyledForm = styled("form", {
  display: "flex",
  justifyContent: "space-between",
})

const classes = {
  input: { width: "100%", marginRight: 16 },
}

export const CrateTodoForm: FC<CrateTodoFormProps> = ({ onSubmit, isDisabled }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  })

  const onSubmitCb = ({ title }: { title: string }) => {
    onSubmit(title)
    reset()
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitCb)}>
      <Input
        {...register("title", { required: true })}
        css={classes.input}
        status={errors.title ? "error" : "primary"}
        placeholder="TODO title"
        aria-label="TODO title"
        disabled={isDisabled}
        contentRight={isDisabled && <Loading size="xs" />}
      />
      <Button type="submit" bordered disabled={isDisabled}>
        Create
      </Button>
    </StyledForm>
  )
}
