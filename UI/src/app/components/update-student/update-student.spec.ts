import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from '../../services/course';
import { StudentService } from '../../services/student';
import { UpdateStudent } from './update-student';

describe('UpdateStudent', () => {
  let component: UpdateStudent;
  let fixture: ComponentFixture<UpdateStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } }
        },
        { provide: Router, useValue: { navigate: vi.fn() } },
        {
          provide: StudentService,
          useValue: {
            getById: vi.fn().mockReturnValue(of({ id: 1, name: 'A Student', courseId: 1 })),
            update: vi.fn().mockReturnValue(of(undefined))
          }
        },
        { provide: CourseService, useValue: { getAll: vi.fn().mockReturnValue(of([])) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
