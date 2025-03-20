import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskPopUpComponent } from '../add-new-task-pop-up/add-new-task-pop-up.component';
import { TaskService } from '../../services/task.service';
import { AllTask, Task } from '../../interface/tasks';
import Swal from 'sweetalert2';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board-container',
  standalone: true,
  imports: [CommonModule, DragDropModule],
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

      if (this.TaskListData) {
        if (!this.TaskListData.todo) this.TaskListData.todo = [];
        if (!this.TaskListData.inProgress) this.TaskListData.inProgress = [];
        if (!this.TaskListData.done) this.TaskListData.done = [];
      }
    });
  }

  addNewTask(type: string) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Prevents opening multiple dialogs
    }

    const dialogRef = this.dialog.open(AddNewTaskPopUpComponent, {
      width: '35vw',
      height: '65vh',
      maxWidth: '90vw',
      data: { taskType: type, isEdit: false },
      panelClass: 'centered-dialog',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(!result.isEdit){
        console.log('Task added successfully');
        if (this.TaskListData) {
          if (result.response.status === 'todo') {
              if (!this.TaskListData.todo) {
              this.TaskListData.todo = [];
              }
              this.TaskListData.todo.push(result.response);
            } else if (result.response.status === 'inProgress') {
              if (!this.TaskListData.inProgress) {
              this.TaskListData.inProgress = [];
              }
              this.TaskListData.inProgress.push(result.response);
            } else if (result.response.status === 'done') {
              if (!this.TaskListData.done) {
              this.TaskListData.done = [];
              }
              this.TaskListData.done.push(result.response);
            }

        }
        this.cdr.detectChanges();
      }
    })
  }

  onEditClick(task: Task) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Prevents opening multiple dialogs
    }

    const dialogRef = this.dialog.open(AddNewTaskPopUpComponent, {
      width: '35vw',
      height: '63vh',
      maxWidth: '90vw',
      data: { taskType: task.status, isEdit: true, task },
      panelClass: 'centered-dialog',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: false
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.TaskListData) {
        const updatedTask = result.response;
        this.updateTask(updatedTask);
    }
  });

   }


  updateTask(updatedTask: Task) {
    if (!this.TaskListData) return;

    // Find the current list
    let currentList: Task[] | null = null;

    if (updatedTask.status === 'todo') {
      currentList = this.TaskListData.todo;
    } else if (updatedTask.status === 'inProgress') {
      currentList = this.TaskListData.inProgress;
    } else if (updatedTask.status === 'done') {
      currentList = this.TaskListData.done;
    }

    if (currentList) {
      const taskIndex = currentList.findIndex(t => t._id === updatedTask._id);
      if (taskIndex !== -1) {
        currentList[taskIndex] = updatedTask;
      }
    }

    this.cdr.detectChanges();
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
    });
  }

  // CDK Drag and Drop Implementation
  onDrop(event: CdkDragDrop<Task[]>) {
    if (!this.TaskListData) return;

      // Ensure all arrays exist
      if (!this.TaskListData.todo) this.TaskListData.todo = [];
      if (!this.TaskListData.inProgress) this.TaskListData.inProgress = [];
      if (!this.TaskListData.done) this.TaskListData.done = [];

      debugger
    if (event.previousContainer === event.container) {
      // Reordering within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Moving between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the task status based on the new container
      const movedTask = event.container.data[event.currentIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);

      if (movedTask && newStatus) {
        // Update task status in UI immediately
        movedTask.status = newStatus;

        // Update task status in backend
        this.taskService.updateTask(movedTask._id, movedTask).subscribe(
          () => console.log('Task status updated successfully'),
          error => console.error('Error updating task status:', error)
        );
      }
    }

    this.cdr.detectChanges();
  }

  // Helper method to determine status from container ID
  private getStatusFromContainerId(containerId: string): string {
    if (containerId === 'todo-list') return 'todo';
    if (containerId === 'inProgress-list') return 'inProgress';
    if (containerId === 'done-list') return 'done';
    return '';
  }
}
