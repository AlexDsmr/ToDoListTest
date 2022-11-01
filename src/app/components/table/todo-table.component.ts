import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  @Input() tasksProps: Task[] = [];

  editingTasksIds: number[] = [];

  ngOnInit(): void {}

  addToEdit(id: number): void {
    this.editingTasksIds.push(id);
  }

  deleteFromEdit(id: number): void {
    const index = this.editingTasksIds.indexOf(id);
    if (index >= 0) this.editingTasksIds.splice(index, 1);
  }

  isEditingTask(id: number): boolean {
    return this.editingTasksIds.includes(id);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
