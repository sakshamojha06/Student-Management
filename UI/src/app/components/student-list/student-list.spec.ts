import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
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
});
