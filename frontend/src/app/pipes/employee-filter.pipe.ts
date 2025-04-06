import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  standalone: false
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: any[], searchText: string): any[] {
    if (!searchText) return employees;

    searchText = searchText.toLowerCase();
    return employees.filter(emp =>
      (emp.first_name + ' ' + emp.last_name + emp.email + emp.designation + emp.department)
        .toLowerCase()
        .includes(searchText)
    );
  }
}
