import Dexie, { Table } from 'dexie';

export interface Task {
  id: string;          // UUID generated on client
  workspace_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  is_deleted: number;  // 0 for false, 1 for true (IndexedDB handles numbers better for indexing)
  updated_at: number;  // Unix timestamp (ms)
  synced: number;      // 0 for false, 1 for true
}

export class DevKuruXDatabase extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super('DevKuruXDB');
    
    // id is the primary key
    // We index updated_at and synced for fast lookup during sync cycles
    this.version(1).stores({
      tasks: 'id, workspace_id, status, is_deleted, updated_at, synced'
    });
  }
}

export const db = new DevKuruXDatabase();