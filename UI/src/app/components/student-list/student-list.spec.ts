import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject } from 'rxjs';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { NotificationService } from '../../services/notification';
import { StudentList } from './student-list';

describe('StudentList', () => {
  let component: StudentList;
  let fixture: ComponentFixture<StudentList>;
  let studentsResponse: Subject<{ id: number; name: string; courseId: number }[]>;
  let coursesResponse: Subject<{ id: number; courseName: string }[]>;
  const studentService = {
    getAll: vi.fn(() => studentsResponse),
    delete: vi.fn()
  };
  const courseService = {
    getAll: vi.fn(() => coursesResponse)
  };

  beforeEach(async () => {
    studentsResponse = new Subject<{ id: number; name: string; courseId: number }[]>();
    coursesResponse = new Subject<{ id: number; courseName: string }[]>();
    studentService.getAll.mockClear();
    studentService.delete.mockReset();
    courseService.getAll.mockClear();
    await TestBed.configureTestingModule({
      imports: [StudentList],
      providers: [
        { provide: StudentService, useValue: studentService },
        { provide: CourseService, useValue: courseService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course name for each student', async () => {
    studentsResponse.next([{ id: 12, name: 'Alex Student', courseId: 3 }]);
    coursesResponse.next([{ id: 3, courseName: 'Computer Science' }]);
    await fixture.whenStable();
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');

    expect(cells[0].textContent.trim()).toBe('12');
    expect(cells[1].textContent.trim()).toBe('Alex Student');
    expect(cells[2].textContent.trim()).toBe('Computer Science');
  });

  it('should show a Bootstrap confirmation modal and delete after confirmation', () => {
    const deleteResponse = of(undefined);
    vi.mocked(studentService.delete).mockReturnValue(deleteResponse);
    const notification = TestBed.inject(NotificationService);
    const showNotification = vi.spyOn(notification, 'show');

    component.deleteStudent(12);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    expect(studentService.delete).not.toHaveBeenCalled();

    component.confirmDelete();

    expect(studentService.delete).toHaveBeenCalledWith(12);
    expect(showNotification).toHaveBeenCalledWith('Student deleted successfully!', 'success');
  });

  it('should not delete when confirmation is cancelled', () => {
    component.deleteStudent(12);
    component.cancelDelete();

    expect(studentService.delete).not.toHaveBeenCalled();
    expect(component.pendingDeleteStudentId()).toBeNull();
  });
});
