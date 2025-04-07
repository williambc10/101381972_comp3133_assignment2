import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchText: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (result: any) => {
        this.employees = result.data.getAllEmployees;
        console.log('Employees:', this.employees);
      },
      error: (err) => {
        console.error('Failed to fetch employees:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  viewEmployee(emp: any) {
    alert(
      `Employee Details:\n\n` +
      `First Name: ${emp.first_name}\n` +
      `Last Name: ${emp.last_name}\n` +
      `Email: ${emp.email}\n` +
      `Gender: ${emp.gender}\n` +
      `Designation: ${emp.designation}\n` +
      `Salary: $${emp.salary}\n` +
      `Date of Joining: ${new Date(emp.date_of_joining).toDateString()}\n` +
      `Department: ${emp.department}`
    );
  }

  deleteEmployee(empId: string) {
    const confirmed = confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;
  
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        alert("Employee deleted successfully!");
        this.employees = this.employees.filter(e => e._id !== empId);
      },
      error: (err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete employee.");
      }
    });
  }
}
