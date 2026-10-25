import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { StudentService } from '../../services/student';
import { StudentList } from './student-list';

describe('StudentList', () => {
  let component: StudentList;
  let fixture: ComponentFixture<StudentList>;
  let studentsResponse: Subject<{ id: number; name: string; courseId: number }[]>;
  const studentService = {
    getAll: vi.fn(() => studentsResponse),
    delete: vi.fn()
  };

  beforeEach(async () => {
    studentsResponse = new Subject<{ id: number; name: string; courseId: number }[]>();
    await TestBed.configureTestingModule({
      imports: [StudentList],
      providers: [
        { provide: StudentService, useValue: studentService },
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

  it('should display student data returned by the API', async () => {
    studentsResponse.next([{ id: 12, name: 'Alex Student', courseId: 3 }]);
    await fixture.whenStable();
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');

    expect(cells[0].textContent.trim()).toBe('12');
    expect(cells[1].textContent.trim()).toBe('Alex Student');
    expect(cells[2].textContent.trim()).toBe('3');
  });
});
