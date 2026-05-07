"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default function TaskList() {
  // Real-time query from local IndexedDB
  const tasks = useLiveQuery(() => 
    db.tasks.where('is_deleted').equals(0).reverse().toArray()
  );

  const toggleTask = async (id: string, currentStatus: string) => {
    await db.tasks.update(id, {
      status: currentStatus === 'completed' ? 'pending' : 'completed',
      updated_at: Date.now(),
      synced: 0 // Mark as unsynced so the backend knows to update
    });
  };

  const softDelete = async (id: string) => {
    await db.tasks.update(id, { 
        is_deleted: 1, 
        updated_at: Date.now(),
        synced: 0 
    });
  };

  if (!tasks) return null;

  return (
    <div className="space-y-2 mt-6">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-muted transition-colors group">
          <div className="flex items-center gap-3">
            <button onClick={() => toggleTask(task.id, task.status)}>
              {task.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted hover:text-primary" />
              )}
            </button>
            <span className={task.status === 'completed' ? 'line-through text-muted' : 'text-foreground'}>
              {task.title}
            </span>
          </div>
          
          <button 
            onClick={() => softDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 rounded transition-all"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}