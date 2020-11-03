import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Input, Switch, Checkbox } from 'antd';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import EditModal from './editModal';
import DeleteModal from './deleteModal'

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditModal: false,
      visibleDeleteModal: false
    };
  }

  openEditModal = () => {
    this.setState({ visibleEditModal: !this.state.visibleEditModal });
  };

  editLabel = (labelVal = null, action = 'cancel') => {
    const { visibleEditModal } = this.state;
    if (labelVal && action === 'save') {
      let obj = {
        label: labelVal,
        id: this.props.task.id,
        type: this.props.task.type,
      };
      this.props.editLabel(obj);
    }
    this.setState({ visibleEditModal: !visibleEditModal });
  };

  onDeleteItem = () => {
   this.setState({ visibleDeleteModal: !this.state.visibleDeleteModal });

  }

  handleDeleteModal = (action = 'cancel') => {
    this.setState({ visibleDeleteModal: !this.state.visibleDeleteModal })
    if(action === 'delete'){
      this.props.deleteItem(this.props.task.id)
    }
  }
  
  render() { 
    const {
      column,
      task: { id, type },
      task,
      index,
    } = this.props;
    const { visibleEditModal, visibleDeleteModal } = this.state;
    return (
      <div>
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <div
              className="task-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {type === 'button' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <div>
                      Button
                      <EditTwoTone onClick={this.openEditModal}/>
                      <DeleteOutlined onClick={this.onDeleteItem}/>
                      <div>
                        <Button type="primary">{task.label}</Button>
                      </div>
                    </div>
                  ) : (
                    <Button type="primary">Button</Button>
                  )}
                </div>
              ) : type === 'input' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <div>
                      {this.props.task.label}
                      <EditTwoTone onClick={this.openEditModal}/>
                      <DeleteOutlined onClick={this.onDeleteItem}/>
                    </div>
                  ) : (
                    <div>Input</div>
                  )}
                  <Input />
                </div>
              ) : type === 'switch' ? (
                <div>
                  Switch
                  <Switch style={{ marginLeft: 5 }} />
                </div>
              ) : type === 'checkbox' ? (
                <Checkbox>Check Box</Checkbox>
              ) : (
                type
              )}            
            </div>
          )}
        </Draggable>
        {visibleEditModal && 
          <EditModal
            visible={visibleEditModal}
            handleEditModal={this.editLabel}            
            inputLabel={task.label}
          />
        }
        {
          visibleDeleteModal &&
           <DeleteModal
            visible={visibleDeleteModal}
            handleDeleteModal={this.handleDeleteModal}/>
        }
      </div>
    );
  }
}
export default Task;
