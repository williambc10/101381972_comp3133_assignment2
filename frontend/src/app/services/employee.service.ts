/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          getAllEmployees {
            _id
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
      fetchPolicy: 'no-cache'
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    });
  }
}
