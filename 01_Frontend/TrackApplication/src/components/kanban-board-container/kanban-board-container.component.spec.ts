import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardContainerComponent } from './kanban-board-container.component';

describe('KanbanBoardContainerComponent', () => {
  let component: KanbanBoardContainerComponent;
  let fixture: ComponentFixture<KanbanBoardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
