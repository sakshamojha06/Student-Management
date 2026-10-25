import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { StudentDetails } from './student-details';

describe('StudentDetails', () => {
  let component: StudentDetails;
  let fixture: ComponentFixture<StudentDetails>;
  let studentResponse: Subject<{ id: number; name: string; courseId: number }>;
  let coursesResponse: Subject<{ id: number; courseName: string }[]>;

  beforeEach(async () => {
    studentResponse = new Subject<{ id: number; name: string; courseId: number }>();
    coursesResponse = new Subject<{ id: number; courseName: string }[]>();

    await TestBed.configureTestingModule({
      imports: [StudentDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } }
        },
        {
          provide: StudentService,
          useValue: {
            getById: vi.fn(() => studentResponse)
          }
        },
        {
          provide: CourseService,
          useValue: {
            getAll: vi.fn(() => coursesResponse)
          }
        },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display student details as soon as they arrive and update the course when it arrives later', () => {
    studentResponse.next({ id: 1, name: 'A Student', courseId: 1 });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('A Student');
    expect(fixture.nativeElement.textContent).toContain('Not assigned');

    coursesResponse.next([{ id: 1, courseName: 'Computer Science' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Computer Science');
  });

  it('should show the correct course when courses arrive before the student', () => {
    coursesResponse.next([{ id: 1, courseName: 'Computer Science' }]);
    studentResponse.next({ id: 1, name: 'A Student', courseId: 1 });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('A Student');
    expect(fixture.nativeElement.textContent).toContain('Computer Science');
  });
});
