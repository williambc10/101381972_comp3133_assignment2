/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/

// app-routing.module.ts:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'edit/:id', component: EditEmployeeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
