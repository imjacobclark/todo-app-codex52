import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from '@/components/todo/TodoApp';

const createIdFactory = (ids: string[]) => {
  let index = 0;
  return () => {
    const nextId = ids[index] ?? `id-${index + 1}`;
    index += 1;
    return nextId;
  };
};

describe('TodoApp', () => {
  it('renders the input and add button', () => {
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    expect(screen.getByLabelText(/todo/i)).toBeEnabled();
    expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
  });

  it('renders an empty state when no todos exist', () => {
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('adds a todo item to the list', async () => {
    const user = userEvent.setup();
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    await user.type(screen.getByLabelText(/todo/i), 'Buy coffee');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Buy coffee')).toBeInTheDocument();
  });

  it('clears the input after adding a todo', async () => {
    const user = userEvent.setup();
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    const input = screen.getByLabelText(/todo/i);
    await user.type(input, 'Walk the dog');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(input).toHaveValue('');
  });

  it('does not add a todo for whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    await user.type(screen.getByLabelText(/todo/i), '   ');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('toggles completion for a todo item', async () => {
    const user = userEvent.setup();
    render(<TodoApp idFactory={createIdFactory(['todo-1'])} />);

    await user.type(screen.getByLabelText(/todo/i), 'Read book');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByRole('checkbox', { name: /read book/i });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText('Read book')).toHaveClass('line-through');

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('Read book')).not.toHaveClass('line-through');
  });

  it('toggles only the selected todo item', async () => {
    const user = userEvent.setup();
    render(<TodoApp idFactory={createIdFactory(['todo-1', 'todo-2'])} />);

    await user.type(screen.getByLabelText(/todo/i), 'First task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await user.type(screen.getByLabelText(/todo/i), 'Second task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const firstCheckbox = screen.getByRole('checkbox', { name: /first task/i });
    const secondCheckbox = screen.getByRole('checkbox', {
      name: /second task/i,
    });

    await user.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();
  });
});
