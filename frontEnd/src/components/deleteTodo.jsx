import React from 'react';
import {Modal, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "react-bootstrap";

const DeleteTodo = ({showRemoveModal, onDelete, setShowRemoveModal}) => {
    return (
        <div>
            <Modal
                isOpen={showRemoveModal.show}
                centered
            >
                <ModalHeader className="border-0 bg-dark">
                    <div className="text-center">Are you sure you want to delete this todo?</div>
                </ModalHeader>
                <ModalFooter className="border-0 bg-dark">
                    <Button className="btn btn-danger" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button className="btn btn-primary"
                            onClick={() => setShowRemoveModal({show: !showRemoveModal, data: null})}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DeleteTodo;