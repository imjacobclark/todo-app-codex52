import TodoApp from '@/components/todo/TodoApp';

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.9),_rgba(226,232,240,0.6),_rgba(203,213,225,0.3))]">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Personal productivity
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Build momentum with a focused todo list
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Add a task, tick it off, repeat. Keep it simple and visible.
          </p>
        </div>
        <TodoApp />
      </main>
    </div>
  );
}
