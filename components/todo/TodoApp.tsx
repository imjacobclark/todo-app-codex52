'use client';

import { useReducer, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { todoReducer } from '@/lib/todoReducer';
import type { Todo } from '@/lib/todoTypes';

import TodoInput from './TodoInput';
import TodoList from './TodoList';

type TodoAppProps = {
  idFactory?: () => string;
};

export default function TodoApp({ idFactory }: TodoAppProps) {
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const createId =
      idFactory ?? (() => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`);

    dispatch({
      type: 'add',
      payload: {
        id: createId(),
        title: trimmedTitle,
      },
    });

    setTitle('');
  };

  const handleToggle = (id: string) => {
    dispatch({
      type: 'toggle',
      payload: {
        id,
      },
    });
  };

  return (
    <Card className="w-full max-w-xl border-border/60 bg-white/90 shadow-xl shadow-slate-900/5 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold text-slate-900">
          Everyday Todos
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Capture the small wins. Keep the list light and actionable.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <TodoInput value={title} onChange={setTitle} onAdd={handleAdd} />
        <TodoList todos={todos} onToggle={handleToggle} />
      </CardContent>
    </Card>
  );
}
