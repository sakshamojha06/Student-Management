import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { StudentList } from './components/student-list/student-list';
import { AddStudent } from './components/add-student/add-student';
import { UpdateStudent } from './components/update-student/update-student';
import { StudentDetails } from './components/student-details/student-details';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'students',
        component: StudentList
    },
    {
        path: 'add-student',
        component: AddStudent
    },
    {
        path: 'update-student/:id',
        component: UpdateStudent
    },
    {
        path: 'student-details/:id',
        component: StudentDetails
    },
    {
        path: '**',
        redirectTo: ''
    }
];
