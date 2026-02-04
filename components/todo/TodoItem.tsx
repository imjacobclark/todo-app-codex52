import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Todo } from '@/lib/todoTypes';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
};

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <li className="rounded-md border border-border px-4 py-3">
      <label className="flex items-start gap-3" htmlFor={checkboxId}>
        <Checkbox
          id={checkboxId}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        />
        <span
          className={cn(
            'text-sm leading-6 text-slate-900',
            todo.completed && 'line-through text-muted-foreground',
          )}
        >
          {todo.title}
        </span>
      </label>
    </li>
  );
}
