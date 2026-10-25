import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { CourseService } from '../../services/course';
import { Student } from '../../models/student';
import { Course } from '../../models/course';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css'
})
export class StudentDetails implements OnInit {
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  student = signal<Student | null>(null);
  private courses = signal<Course[]>([]);
  courseName = computed(() => {
    const student = this.student();
    if (!student) {
      return '';
    }

    return this.courses().find(course => course.id === student.courseId)?.courseName ?? 'Not assigned';
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadStudent(id);
    this.loadCourses();
  }

  loadStudent(id: number): void {
    this.studentService.getById(id).subscribe({
      next: (data) => this.student.set(data),
      error: (error) => console.error(error)
    });
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses.set(data),
      error: (error) => console.error(error)
    });
  }
}