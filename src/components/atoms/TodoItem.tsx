import { FC, useState } from "react"

import { Button, Text, Dropdown, Card, Progress, Input, styled } from "@nextui-org/react"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import { useBoolean } from "react-use"

import { ConfirmModal } from "components/atoms/ConfirmModal"
import { Todo, TODO_STATE } from "types/todo"

interface TodoItemProps extends Todo {
  onDeletePressed: (id: string) => void
  onTitleChanged: (id: string, title: string) => void
  onStatusChanged: (id: string) => void
  isLoading?: boolean
}

const classes = {
  card: { marginBottom: 16 },
  cardBody: { color: "$backgroundAlpha" },
  deleteButton: { marginLeft: 6, marginRight: 6 },
  input: { width: "100%", marginRight: 6, marginTop: 12, marginBottom: 12 },
  progress: { marginTop: 14, marginBottom: 14 },
}

const StyledCenter = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const StyledFlex = styled("div", {
  display: "flex",
})

export const TodoItem: FC<TodoItemProps> = ({
  _id,
  title,
  status,
  onStatusChanged,
  onTitleChanged,
  onDeletePressed,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = useBoolean(false)
  const [isModalOpen, setIsModalOpen] = useBoolean(false)
  const [editText, setEditText] = useState<string>(title)
  const isDone = status === TODO_STATE.DONE
  const buttonLabel = isDone ? "Done" : "In Progress"

  const handleSwitchEditing = () => setIsEditing(!isEditing)
  const handleCloseEdit = () => setIsEditing(false)

  const handleTitleChanged = () => {
    if (editText.trim() !== title.trim()) {
      onTitleChanged(_id, editText)
    }
    handleCloseEdit()
  }

  const handleStatusChanged = () => onStatusChanged(_id)
  const handleDeletePressed = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const handleConfirmModal = () => {
    onDeletePressed(_id)
    handleModalClose()
  }

  return (
    <>
      <ConfirmModal isOpen={isModalOpen} onCancel={handleModalClose} onConfirm={handleConfirmModal} />
      <Card css={classes.card}>
        <Card.Body css={classes.cardBody}>
          {isLoading && <Progress css={classes.progress} indeterminated color="gradient" value={100} />}
          {!isLoading && (
            <StyledCenter>
              {isEditing ? (
                <Input
                  aria-label="Edit todo"
                  css={classes.input}
                  status="primary"
                  helperText="Press Enter to save"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onClearClick={handleCloseEdit}
                  onKeyPress={(event) => event.key === "Enter" && handleTitleChanged()}
                />
              ) : (
                <Text>{title}</Text>
              )}

              <StyledFlex>
                <Button auto color="secondary" icon={<FiEdit2 />} onPress={handleSwitchEditing} />
                <Button
                  auto
                  color="error"
                  icon={<AiOutlineDelete />}
                  css={classes.deleteButton}
                  onPress={handleDeletePressed}
                />
                <Dropdown disableTriggerPressedAnimation>
                  <Dropdown.Button shadow color={isDone ? "success" : "default"}>
                    {buttonLabel}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    onAction={handleStatusChanged}
                    disabledKeys={[isDone ? `done-${_id}` : `in-progress-${_id}`]}
                    aria-label="Complete status"
                  >
                    <Dropdown.Item key={`in-progress-${_id}`}>In Progress</Dropdown.Item>
                    <Dropdown.Item key={`done-${_id}`}>Done</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </StyledFlex>
            </StyledCenter>
          )}
        </Card.Body>
      </Card>
    </>
  )
}
