"use client";

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

export default function QuickEntry() {
  const [title, setTitle] = useState('');

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      workspace_id: 'default', // We'll implement workspaces later
      title: title.trim(),
      status: 'pending' as const,
      is_deleted: 0,
      updated_at: Date.now(),
      synced: 0, // Flag for the backend sync engine
    };

    await db.tasks.add(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={addTask} className="relative group">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Plus className="w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task (Press Enter)..."
        className="w-full bg-card border border-border rounded-lg py-3 pl-10 pr-4 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </form>
  );
}