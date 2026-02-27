import type { Timestamp } from './common';
import type { TaskStatus } from './enums';

/** Task document — `tasks/{id}` */
export interface Task {
  id: string;
  spzn: string;
  klient: string;
  ukol: string;
  odhad: number | null;
  realnyTime: number | null;
  datum: Timestamp | null;
  urgent: boolean;
  lhuta: Timestamp | null;
  poznamka: string;
  status: TaskStatus;
  assignedTo: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
