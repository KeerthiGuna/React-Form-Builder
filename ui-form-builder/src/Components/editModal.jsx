import React, { Component } from 'react';
import { Input, Modal } from 'antd';

class EditModal extends Component {
  state = {
    labelVal: null,
  };

  componentDidMount() {
    this.setState({ labelVal: this.props.inputLabel });
  }

  handleEditModal = (action) => {
    this.props.handleEditModal(this.state.labelVal, action);
  };

  handleInput = (e) => {
    this.setState({ labelVal: e.target.value });
  };

  render() {
    const {
      visible,
    } = this.props;
    const { labelVal } = this.state;
    return (
      <div>
        <Modal
          title='Edit'
          visible={visible}
          onOk={() => this.handleEditModal('save')}
          onCancel={() => this.handleEditModal('cancel')}
        >
          <Input
            className="label-input"
            value={labelVal}
            onChange={this.handleInput}
          />
        </Modal>
      </div>
    );
  }
}
export default EditModal;
