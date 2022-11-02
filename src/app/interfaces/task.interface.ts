/** Задача */
export interface Task {
  /** Идентификатор задачи (дата создания) */
  id: number;

  /** Задача */
  task: string;

  /** Флаг выполнена/не выполнена задача */
  isCompleted: boolean;

  /** Дата завершения задачи */
  completeDate: number | null;
}
