import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskPopUpComponent } from '../add-new-task-pop-up/add-new-task-pop-up.component';
import { TaskService } from '../../services/task.service';
import { AllTask, Task } from '../../interface/tasks';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban-board-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-board-container.component.html',
  styleUrl: './kanban-board-container.component.css'
})
export class KanbanBoardContainerComponent {

  TaskListData: AllTask | null = null;


  constructor(private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllTasksList();
  }

  getAllTasksList() {
    this.taskService.getTasks().subscribe((response) => {
      this.TaskListData = response;
    });
  }

  addNewTask(type: string) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Prevents opening multiple dialogs
    }

    this.dialog.open(AddNewTaskPopUpComponent, {
      width: '35vw',
      height: '63vh',
      maxWidth: '90vw',
      data: { taskType: type, isEdit: false },
      panelClass: 'centered-dialog',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: false,
    });
  }


  onDeleteClick(task: Task) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the task: "${task.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.deleteTask(task);
        Swal.fire('Deleted!', 'The task has been deleted.', 'success');
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id).subscribe(() => {
      if (this.TaskListData) {
        // Identify which list the task belongs to and remove it
        if (this.TaskListData.todo.some(t => t._id === task._id)) {
          this.TaskListData.todo = this.TaskListData.todo.filter(t => t._id !== task._id);
        } else if (this.TaskListData.inProgress.some(t => t._id === task._id)) {
          this.TaskListData.inProgress = this.TaskListData.inProgress.filter(t => t._id !== task._id);
        } else if (this.TaskListData.done.some(t => t._id === task._id)) {
          this.TaskListData.done = this.TaskListData.done.filter(t => t._id !== task._id);
        }

        this.cdr.detectChanges();
      }
      Swal.fire('Deleted!', 'The task has been deleted.', 'success');
    });
  }


}
