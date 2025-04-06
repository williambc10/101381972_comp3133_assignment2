import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: false,
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {
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

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.apollo.query({
      query: gql`
        query GetEmployeeById($id: ID!) {
          getEmployeeById(id: $id) {
            first_name
            last_name
            email
            gender
            designation
            salary
            department
            date_of_joining
          }
        }
      `,
      variables: { id: this.employeeId },
      fetchPolicy: 'no-cache'
    }).subscribe((result: any) => {
      this.employeeForm.patchValue(result.data.getEmployeeById);
    });
  }

  onSubmit() {
    const { gender, ...input } = {
      ...this.employeeForm.value,
      salary: parseFloat(this.employeeForm.value.salary)
    };

    this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee(
          $id: ID!,
          $first_name: String,
          $last_name: String,
          $email: String,
          $designation: String,
          $salary: Float,
          $date_of_joining: String,
          $department: String
        ) {
          updateEmployee(
            id: $id,
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            designation: $designation,
            salary: $salary,
            date_of_joining: $date_of_joining,
            department: $department
          ) {
            _id
          }
        }
      `,
      variables: { id: this.employeeId, ...input }
    }).subscribe({
      next: () => {
        alert('Employee updated!');
        this.router.navigate(['/employee-list']);
      },
      error: err => {
        console.error('Update error:', err);
        alert('Update failed!');
      }
    });
  }

  cancel() {
    this.router.navigate(['/employee-list']);
  }
}
