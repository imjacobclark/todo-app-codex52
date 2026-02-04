import type { Todo } from '@/lib/todoTypes';

import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
};

export default function TodoList({ todos, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
        No todos yet
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}
