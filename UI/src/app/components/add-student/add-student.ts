import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { CourseService } from '../../services/course';
import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent implements OnInit {

  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  student: Student = {
    id: 0,
    name: '',
    courseId: 0
  };

  courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses.set(data),
      error: (error) => console.error(error)
    });
  }

  addStudent(): void {
    this.studentService.add(this.student).subscribe({
      next: () => {
        this.notification.show('Student added successfully!', 'success');
        this.router.navigate(['/students']);
      },
      error: (error) => console.error(error)
    });
  }
}
