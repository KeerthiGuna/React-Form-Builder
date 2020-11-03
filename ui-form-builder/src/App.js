import React, { Component } from 'react';
import './App.css';
import dummyData from './dummyData';
import Column from './Components/column';
import { DragDropContext } from 'react-beautiful-dnd';
import { Layout, Button, notification } from 'antd';

const generateUniqueId = require('generate-unique-id');


const { Header, Content } = Layout;

class App extends Component {
  state = dummyData;

  componentDidMount() {
    if (localStorage.getItem('saveData')) {
      let existData = localStorage.getItem('taskId');
      let existTaskData = localStorage.getItem('taskList');
      existTaskData = JSON.parse(existTaskData);
      let taskObj = {};
      existTaskData.forEach((item) => {
        taskObj[item.id] = item;
      });
      const start = this.state.columns['column-2'];
      const updatedColumn = {
        ...start,
        taskIds: JSON.parse(existData),
      };
      const updatedState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [updatedColumn.id]: updatedColumn,
        },
        tasks: { ...taskObj, ...dummyData.tasks },
      };
      this.setState(updatedState);
    }
  }

  clearForm = () => {
    this.setState(dummyData);
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start === finish && source.droppableId !== 'column-1') {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const updatedState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [updatedColumn.id]: updatedColumn,
        },
      };

      this.setState(updatedState);
      return;
    }

    if (
      source.droppableId === 'column-1' &&
      destination.droppableId === 'column-2'
    ) {
      const finishTaskIds = Array.from(finish.taskIds);
      let uniqueIdGenerator = generateUniqueId();
      let type;
      if (draggableId === '1') {
        type = 'input';
      } else if (draggableId === '2') {
        type = 'button';
      } else if (draggableId === '3') {
        type = 'switch';
      } else if (draggableId === '4') {
        type = 'checkbox';
      }
      finishTaskIds.splice(destination.index, 0, uniqueIdGenerator);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const updatedState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newFinish.id]: newFinish,
        },
        tasks: {
          ...this.state.tasks,
          [uniqueIdGenerator]: { id: uniqueIdGenerator, type, label: type },
        },
      };
      this.setState(updatedState);
    }
  };

  onSave = () => {
    const { columns, tasks } = this.state;
    localStorage.setItem('saveData', true);
    localStorage.setItem('taskId', JSON.stringify(columns['column-2'].taskIds));
    const task = columns['column-2'].taskIds.map((taskId) => tasks[taskId]);
    localStorage.setItem('taskList', JSON.stringify(task));

    notification['success']({
      message: 'Success',
      description: 'Form Saved Successfully.',
    });
  };

  onClear = () => {
    localStorage.clear();
    this.clearForm();
    notification['success']({
      message: 'Success',
      description: 'Form Cleared Successfully.',
    });
  };

  setLabel = (value) => {
    const updatedState = {
      ...this.state,
      columns: {
        ...this.state.columns,
      },
      tasks: {
        ...this.state.tasks,
        [value.id]: {
          id: value.id,
          label: value.label,
          type: value.type,
        },
      },
    };
    this.setState(updatedState);
  };

  deleteItem = (item) => {
    const { columns, tasks, columnOrder } = this.state    
    delete tasks[item]
    let toolColumns = columns['column-1']
    let filteredColumn = columns['column-2'].taskIds.filter((data)=>data !== item)
    this.setState({
      ...tasks,
      columns: {
        'column-1': toolColumns, 
        'column-2': {id: "column-2", title: "Build Form", taskIds: filteredColumn}
      },
      ...columnOrder
    })
}

  render() {
    const { columnOrder, columns } = this.state;
    return (
      <div className="fit-height">
        <Layout className="main-layout">
          <Header className="header">
            <span>FORM BUILDER</span>
          </Header>
          <Content className="main-content">            
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                  <div className="column-direction">
                    {columnOrder.map((columnId) => {
                      const column = columns[columnId];
                      const tasks = column.taskIds.map(
                        (taskId) => this.state.tasks[taskId]
                      );
                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          clearForm={this.clearForm}
                          editLabel={this.setLabel}
                          deleteItem={this.deleteItem}
                        />
                      );
                    })}
                  </div>
                  {columns['column-2'].taskIds.length >= 1 && (
                    <div className="button-container">
                      <Button
                        type="primary"
                        className="button-align"
                        onClick={this.onSave}
                      >
                        Save Form
                      </Button>
                      <Button
                        className="button-align"
                        onClick={this.onClear}
                      >
                        Clear Form
                      </Button>
                    </div>
                  )}
                </div>
              </DragDropContext>            
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
