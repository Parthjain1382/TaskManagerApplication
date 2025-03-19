import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskPopUpComponent } from '../add-new-task-pop-up/add-new-task-pop-up.component';
@Component({
  selector: 'app-kanban-board-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-board-container.component.html',
  styleUrl: './kanban-board-container.component.css'
})
export class KanbanBoardContainerComponent {

  dataExample = {
    todo: [
        {
            "_id": "67dab55027cd9641ef78d3ed",
            "title": "Implement Authentication",
            "description": "Set up user authentication using JWT",
            "subtasks": [
                "Design login UI",
                "Implement JWT authentication",
                "Test login flow"
            ],
            "status": "todo"
        },
        {
          "_id": "67dab55027cd9641ef78d3ed",
          "title": "Implement Authentication",
          "description": "Set up user authentication using JWT",
          "subtasks": [
              "Design login UI",
              "Implement JWT authentication",
              "Test login flow"
          ],
          "status": "todo"
      },
      {
        "_id": "67dab55027cd9641ef78d3ed",
        "title": "Implement Authentication",
        "description": "Set up user authentication using JWT",
        "subtasks": [
            "Design login UI",
            "Implement JWT authentication",
            "Test login flow"
        ],
        "status": "todo"
    }
    ],
    done: [
        {
            "_id": "67dad5ecccbaf73da826bb93",
            "title": "Develop API Endpoint check",
            "description": "Create RESTful API for task management",
            "subtasks": [
                "Set up Express",
                "Define routes",
                "Implement controllers"
            ],
            "status": "done",
            "__v": 0
        },
        {
          "_id": "67dad5ecccbaf73da826bb93",
          "title": "Develop API Endpoint check",
          "description": "Create RESTful API for task management",
          "subtasks": [
              "Set up Express",
              "Define routes",
              "Implement controllers"
          ],
          "status": "done",
          "__v": 0
      }
, {
  "_id": "67dad5ecccbaf73da826bb93",
  "title": "Develop API Endpoint check",
  "description": "Create RESTful API for task management",
  "subtasks": [
      "Set up Express",
      "Define routes",
      "Implement controllers"
  ],
  "status": "done",
  "__v": 0
}

    ],
    inProgress: [ {
      "_id": "67dad5ecccbaf73da826bb93",
      "title": "Develop API Endpoint check Inprogress",
      "description": "Create RESTful API for task management",
      "subtasks": [
          "Set up Express",
          "Define routes",
          "Implement controllers"
      ],
      "status": "done",
      "__v": 0
  }]
}


  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }
  addNewTask(type: string) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Prevents opening multiple dialogs
    }

    this.dialog.open(AddNewTaskPopUpComponent, {
      width: '35vw',
      height: '63vh',
      maxWidth: '90vw',
      data: { taskType: type },
      panelClass: 'centered-dialog',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: false,
    });
  }
}
