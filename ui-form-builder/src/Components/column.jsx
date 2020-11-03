import React, { Component } from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

class Column extends Component {
  editLabel = (labelVal) => {
    this.props.editLabel(labelVal);
  };

  deleteItem = (item) => {
    this.props.deleteItem(item)
  }

  render() {
    const {
      column: { title, id },
      tasks,
      column,
    } = this.props;
    return (
      <div  className={title === 'Build Form' ? 'column-container form-builder': 'column-container tool-box' }>
        <div className="column-title">{title}</div>
        <Droppable droppableId={id} type="TASK">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  column={column}
                  editLabel={this.editLabel}
                  deleteItem={this.deleteItem}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
       </div>
    );
  }
}

export default Column;
