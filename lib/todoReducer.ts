import type { Todo } from './todoTypes';

type AddTodoAction = {
  type: 'add';
  payload: {
    id: string;
    title: string;
  };
};

type ToggleTodoAction = {
  type: 'toggle';
  payload: {
    id: string;
  };
};

export type TodoAction = AddTodoAction | ToggleTodoAction;

export const addTodo = (todos: Todo[], id: string, title: string): Todo[] => [
  ...todos,
  {
    id,
    title,
    completed: false,
  },
];

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'add':
      return addTodo(state, action.payload.id, action.payload.title);
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    default:
      return state;
  }
};
