import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { NotificationService } from '../../services/notification';
import { AddStudent } from './add-student';

describe('AddStudent', () => {
  let component: AddStudent;
  let fixture: ComponentFixture<AddStudent>;
  const courses = [
    { id: 1, courseName: 'Angular' },
    { id: 2, courseName: 'C#' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudent],
      providers: [
        { provide: StudentService, useValue: { add: vi.fn(() => of(undefined)) } },
        { provide: CourseService, useValue: { getAll: vi.fn(() => of(courses)) } },
        provideRouter([{ path: 'students', children: [] }])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show course names in the course dropdown', () => {
    const select = (fixture.nativeElement as HTMLElement).querySelector<HTMLSelectElement>(
      'select[name="courseId"]'
    );
    const options = Array.from(select?.options ?? []).map((option) => option.textContent?.trim());

    expect(options).toEqual(['Select Course', 'Angular', 'C#']);
  });

  it('should show a success notification after adding a student', () => {
    const notification = TestBed.inject(NotificationService);
    const showNotification = vi.spyOn(notification, 'show');

    component.addStudent();

    expect(showNotification).toHaveBeenCalledWith('Student added successfully!', 'success');
  });
});
