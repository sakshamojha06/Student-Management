import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Course } from '../models/course';
import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses from the API route', () => {
    const courses: Course[] = [{ id: 1, courseName: 'Computer Science' }];

    service.getAll().subscribe((result) => {
      expect(result).toEqual(courses);
    });

    const request = httpTestingController.expectOne('http://localhost:5120/api/Course');
    expect(request.request.method).toBe('GET');
    request.flush(courses);
    httpTestingController.verify();
  });
});
