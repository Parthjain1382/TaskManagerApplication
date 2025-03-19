import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-task-pop-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-new-task-pop-up.component.html',
  styleUrl: './add-new-task-pop-up.component.css'
})
export class AddNewTaskPopUpComponent {
  taskType: string = ''

  detailsForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    subtasks: this.fb.array([this.createSubtask()]),
    description: ['']
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef:MatDialogRef<AddNewTaskPopUpComponent>,
  private fb: FormBuilder) { }

  ngOnInit() {
    this.taskType = this.data.taskType
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

  closePopUp(){
    this.dialogRef.close()
  }

  onAddClick(){
    if (this.detailsForm.valid) {
      const formData = this.detailsForm.value;
      console.log('Form Data:', formData);
      this.dialogRef.close(formData);
    } else {
      console.log('Form is invalid');
    }
  }

}
