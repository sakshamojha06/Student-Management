import { Component, OnInit, inject, signal } from '@angular/core';
import { Course } from '../../models/course';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { NotificationService } from '../../services/notification';

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
  private notification = inject(NotificationService);

  students = signal<Student[]>([]);
  courses = signal<Course[]>([]);
  pendingDeleteStudentId = signal<number | null>(null);

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
    this.pendingDeleteStudentId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteStudentId.set(null);
  }

  confirmDelete(): void {
    const id = this.pendingDeleteStudentId();
    if (id === null) {
      return;
    }

    this.cancelDelete();
    this.studentService.delete(id).subscribe({
      next: () => {
        this.notification.show('Student deleted successfully!', 'success');
        this.loadStudents();
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }
}
