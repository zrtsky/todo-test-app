import { FC, useState } from "react"

import { Button, Card, Grid, styled, Text } from "@nextui-org/react"
import { AiOutlineDelete } from "react-icons/ai"
import { useBoolean } from "react-use"

import { ConfirmModal, TodoItem } from "components/atoms"
import { CrateTodoForm } from "components/molecules"
import {
  useAddTodoMutation,
  useDeleteTodoListMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useSwitchTodoCompleteStatusMutation,
  useUpdateTodoTitleMutation,
} from "services"
import { TodoList } from "types/todo"

interface TodoCardsGridProps {
  todoLists: TodoList[]
}

const classes = {
  cardTitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  createTodo: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 54,
    marginTop: 24,
  },
}

const StyledFlex = styled("div", {
  display: "flex",
  justifyContent: "space-between",
})

export const TodoCardsGrid: FC<TodoCardsGridProps> = ({ todoLists }) => {
  const [lastIdChanged, setLastIdChanged] = useState("")
  const [isModalOpen, setIsModalOpen] = useBoolean(false)

  const { refetch, isFetching: isLoadingGetAllTodos } = useGetAllTodosQuery(null)
  const [switchTodo, { isLoading: isLoadingSwitchTodo }] = useSwitchTodoCompleteStatusMutation()
  const [updateTodoTitle, { isLoading: isLoadingUpdateTodoTitle }] = useUpdateTodoTitleMutation()
  const [deleteTodo, { isLoading: isLoadingDeleteTodo }] = useDeleteTodoMutation()
  const [addTodo, { isLoading: isLoadingAddTodo }] = useAddTodoMutation()
  const [deleteTodoList, { isLoading: isLoadingDeleteTodoList }] = useDeleteTodoListMutation()

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const requestHandler = async (request: () => Promise<unknown>, lastId: string) => {
    setLastIdChanged(lastId)
    await request()
    refetch()
  }

  const handleSwitchTodo = async (id: string) => {
    requestHandler(() => switchTodo(id), id)
  }

  const handleTitleChange = async (id: string, title: string) => {
    requestHandler(() => updateTodoTitle({ id, title }), id)
  }

  const handleDeleteTodo = async (id: string) => {
    requestHandler(() => deleteTodo(id), id)
  }

  const handleCreateTodo = async (title: string, todoListId: string) => {
    requestHandler(() => addTodo({ title, todoListId }), todoListId)
  }

  const handleDeleteTodoList = async (id: string) => {
    await requestHandler(() => deleteTodoList(id), id)
    handleCloseModal()
  }

  const isFetchingData =
    isLoadingSwitchTodo ||
    isLoadingGetAllTodos ||
    isLoadingUpdateTodoTitle ||
    isLoadingDeleteTodo ||
    isLoadingAddTodo ||
    isLoadingDeleteTodoList

  return (
    <Grid.Container gap={2}>
      {todoLists.map(({ _id, title, todos }) => (
        <Grid xs={12} sm={6} key={_id}>
          <ConfirmModal isOpen={isModalOpen} onCancel={handleCloseModal} onConfirm={() => handleDeleteTodoList(_id)} />
          <Card>
            <Card.Body>
              <StyledFlex>
                <Text size="$2xl" css={classes.cardTitle}>
                  {title}
                </Text>
                <Button auto icon={<AiOutlineDelete />} color="default" onPress={handleOpenModal} />
              </StyledFlex>

              {todos.map((todo) => (
                <TodoItem
                  {...todo}
                  key={todo._id}
                  isLoading={isFetchingData && lastIdChanged === todo._id}
                  onStatusChanged={handleSwitchTodo}
                  onTitleChanged={handleTitleChange}
                  onDeletePressed={handleDeleteTodo}
                />
              ))}

              {!todos.length && (
                <Text size="$lg" css={classes.createTodo}>
                  Now you can create your first TODO 🚀
                </Text>
              )}

              <CrateTodoForm
                onSubmit={(title) => handleCreateTodo(title, _id)}
                isDisabled={isFetchingData && lastIdChanged === _id}
              />
            </Card.Body>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}
