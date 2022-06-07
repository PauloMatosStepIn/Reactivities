import { observer } from 'mobx-react-lite'
import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import { useStore } from '../../stores/store'

export default observer(function ModalContainer() {
  const { modalStore } = useStore()

  return (
    <Modal show={modalStore.modal.open} onHide={modalStore.closeModal} size="sm" dialogClassName={'primaryModal'}>
      <ModalBody>{modalStore.modal.body}</ModalBody>
    </Modal>
  )
})

// https://www.pluralsight.com/guides/working-with-bootstraps-modals-react
