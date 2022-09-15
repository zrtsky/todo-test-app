import { FC } from "react"

import { Button, Loading, Modal, Text } from "@nextui-org/react"

interface ConfirmModalProps {
  text?: string
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
  isLoading?: boolean
}

const classes = {
  modalBody: { marginTop: 54, marginBottom: 54 },
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  text = "Are you sure what you want to delete the record",
  isLoading = false,
}) => (
  <Modal closeButton blur aria-labelledby="modal-title" open={isOpen} onClose={onCancel}>
    {isLoading && (
      <Modal.Body css={classes.modalBody}>
        <Loading size="xl" />
      </Modal.Body>
    )}
    {!isLoading && (
      <>
        <Modal.Header>
          <Text id="modal-title" size={16}>
            {text}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={onCancel}>
            Cancel
          </Button>
          <Button auto onPress={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </>
    )}
  </Modal>
)
