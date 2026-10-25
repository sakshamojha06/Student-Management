import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { CourseService } from '../../services/course';
import { Student } from '../../models/student';
import { Course } from '../../models/course';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './update-student.html',
  styleUrl: './update-student.css'
})
export class UpdateStudent implements OnInit {
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  studentId = 0;

  student: Student = {
    id: 0,
    name: '',
    courseId: 0
  };

  courses: Course[] = [];

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCourses();
    this.loadStudent();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses = data,
      error: (error) => console.error(error)
    });
  }

  loadStudent(): void {
    this.studentService.getById(this.studentId).subscribe({
      next: (data) => this.student = data,
      error: (error) => console.error(error)
    });
  }

  updateStudent(): void {
    this.studentService.update(this.studentId, this.student).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/students']);
      },
      error: (error) => console.error(error)
    });
  }
}