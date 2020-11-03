import React, { Component } from 'react';
import { Modal } from 'antd';

class deleteModal extends Component{

    handleDelete = (action) => {
        this.props.handleDeleteModal(action);
    };    

    render(){
        const { visible } = this.props
        return(
            <Modal
            title="Delete Confirmation"
            visible={visible}
            onOk={() => this.handleDelete('delete')}
            onCancel={() => this.handleDelete('cancel')}
            >
                Are you sure to delete item?
            </Modal>
        )
    }
}

export default deleteModal;