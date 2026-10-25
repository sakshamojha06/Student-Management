import { Component, OnInit, inject, signal } from '@angular/core';
import { Course } from '../../models/course';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit {

  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  students = signal<Student[]>([]);
  courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses.set(data),
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  getCourseName(courseId: number): string {
    return this.courses().find((course) => course.id === courseId)?.courseName ?? 'Unknown course';
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students.set(data);
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
        }
      });
    }
  }
}
