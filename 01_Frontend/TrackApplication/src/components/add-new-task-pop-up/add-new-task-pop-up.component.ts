import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-add-new-task-pop-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-task-pop-up.component.html',
  styleUrl: './add-new-task-pop-up.component.css'
})
export class AddNewTaskPopUpComponent implements OnInit {
  taskType: string = '';
  isEdit: boolean = false;

  detailsForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    subtasks: this.fb.array([]), // Initialize empty
    description: ['']
  });
  swal: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddNewTaskPopUpComponent>,
    private fb: FormBuilder,
    private readonly taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskType = this.data.taskType;
    this.isEdit = this.data.isEdit || false; // Check if editing
    if (this.isEdit && this.data.task) {
      this.populateForm(this.data.task); // Populate form if editing
    } else {
      this.addSubtask(); // Ensure at least one subtask field is present
    }
  }

  populateForm(task: any) {
    this.detailsForm.patchValue({
      title: task.title,
      description: task.description
    });

    // Populate subtasks
    if (task.subtasks && task.subtasks.length > 0) {
      const subtasksArray = this.detailsForm.get('subtasks') as FormArray;
      task.subtasks.forEach((subtask: string) => {
        subtasksArray.push(this.fb.control(subtask, Validators.required));
      });
    } else {
      this.addSubtask(); // Ensure at least one subtask input
    }
  }

  createSubtask() {
    return this.fb.control('', Validators.required);
  }

  addSubtask() {
    const subtasks = this.detailsForm.get('subtasks') as FormArray;
    subtasks.push(this.createSubtask());
  }

  removeSubtask(index: number) {
    const subtasks = this.detailsForm.get('subtasks') as FormArray;
    if (subtasks.length > 1) {
      subtasks.removeAt(index);
    }
  }

  get subtasksArray() {
    return this.detailsForm.get('subtasks') as FormArray;
  }

  closePopUp() {
    this.dialogRef.close();
  }

  onAddClick() {
    if (this.detailsForm.valid) {
      const formData = this.detailsForm.value;
      this.taskService.addTask({...formData, status: this.data.taskType}).subscribe((response) => {
        this.dialogRef.close({ response, isEdit: this.isEdit });
        Swal.fire({
          title: 'Success!',
          text: 'Task added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.log('Error adding task', error);
      }
    )
    } else {
      console.log('Form is invalid');
    }
  }

  onEditClick(){
    if (this.detailsForm.valid) {
      const formData = this.detailsForm.value;
      debugger
      this.taskService.updateTask(this.data.task._id, {...formData, status: this.data.taskType}).subscribe((response) => {
        this.dialogRef.close({ response, isEdit: this.isEdit });
        Swal.fire({
          title: 'Success!',
          text: 'Task Edit successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }),
      (error: any) => {
        console.log('Error Editing task', error);
      }
    }
      else {
      console.log('Form is invalid');
    }
  }
}
