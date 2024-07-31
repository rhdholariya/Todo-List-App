import React from "react";
import { Modal, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "react-bootstrap";
import { useTodoContext } from "../Context/TodoContext";

interface DeleteTodoProps {
  onDelete: () => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({
  onDelete,
}) => {
  const {showRemoveModal,setShowRemoveModal} = useTodoContext();
  return (
    <div>
      <Modal isOpen={showRemoveModal.show} centered>
        <ModalHeader className="border-0 bg-dark">
          <div className="text-center">
            Are you sure you want to delete this item?
          </div>
        </ModalHeader>
        <ModalFooter className="border-0 bg-dark">
          <Button className="btn btn-danger" onClick={onDelete}>
            Delete
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() =>
              setShowRemoveModal({ show: !showRemoveModal.show, data: null })
            }
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteTodo;
