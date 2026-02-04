import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TodoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-medium text-foreground"
        htmlFor="todo-input"
      >
        Todo
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="todo-input"
          placeholder="Add something you want to finish"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <Button className="sm:w-28" type="button" onClick={onAdd}>
          Add
        </Button>
      </div>
    </div>
  );
}
