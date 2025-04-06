import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const input = { ...this.employeeForm.value,
      salary: parseFloat(this.employeeForm.value.salary)};

      console.log('🚀 Submitting employee:', input);

      this.apollo.mutate({
        mutation: gql`
          mutation AddEmployee(
            $first_name: String!,
            $last_name: String!,
            $email: String!,
            $gender: String!,
            $designation: String!,
            $salary: Float!,
            $date_of_joining: String!,
            $department: String!
          ) {
            addEmployee(
              first_name: $first_name,
              last_name: $last_name,
              email: $email,
              gender: $gender,
              designation: $designation,
              salary: $salary,
              date_of_joining: $date_of_joining,
              department: $department
            ) {
              _id
              first_name
              last_name
            }
          }
        `,
        variables: input
      }).subscribe({
        next: (res) => {
          console.log('✅ Employee Added:', res);
          this.router.navigate(['/employee-list']);
          window.alert('Employee added successfully!');
        },
        error: (err) => {
          console.error('Add failed:', err);
          window.alert('Add failed!');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/employee-list']);
  }
}