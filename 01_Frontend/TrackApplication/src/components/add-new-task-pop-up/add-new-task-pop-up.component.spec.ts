import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskPopUpComponent } from './add-new-task-pop-up.component';

describe('AddNewTaskPopUpComponent', () => {
  let component: AddNewTaskPopUpComponent;
  let fixture: ComponentFixture<AddNewTaskPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTaskPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewTaskPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
