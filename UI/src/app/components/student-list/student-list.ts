import { Component, OnInit, inject, signal } from '@angular/core';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit {

  private studentService = inject(StudentService);

  students = signal<Student[]>([]);

  ngOnInit(): void {
    this.loadStudents();
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
