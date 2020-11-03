const dummyData = {
  tasks: {
    '1': {
      id: '1',
      type: 'input',
    },
    '2': {
      id: '2',
      type: 'button',
    },
    '3': {
      id: '3',
      type: 'switch',
    },
    '4': { 
      id: '4', 
      type: 'checkbox' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Form Items',
      taskIds: ['1', '2', '3', '4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Build Form',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2'],
};

export default dummyData;
