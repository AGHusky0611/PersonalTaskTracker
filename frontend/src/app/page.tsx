import QuickEntry from '@/components/QuickEntry';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-24">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">DevKuruX.todo</h1>
          <p className="text-muted">Stay synced. Stay productive.</p>
        </header>

        <QuickEntry />
        <TaskList />
      </div>
    </main>
  );
}