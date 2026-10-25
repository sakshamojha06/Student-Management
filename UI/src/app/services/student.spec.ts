import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Student } from '../models/student';
import { StudentService } from './student';

describe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students from the API route', () => {
    const students: Student[] = [{ id: 1, name: 'Alex', courseId: 1 }];

    service.getAll().subscribe((result) => {
      expect(result).toEqual(students);
    });

    const request = httpTestingController.expectOne('http://localhost:5120/api/Student');
    expect(request.request.method).toBe('GET');
    request.flush(students);
    httpTestingController.verify();
  });
});
