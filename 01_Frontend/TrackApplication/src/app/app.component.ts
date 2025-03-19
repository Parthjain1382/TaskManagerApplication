import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardContainerComponent } from "../components/kanban-board-container/kanban-board-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KanbanBoardContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TrackApplication';
}
