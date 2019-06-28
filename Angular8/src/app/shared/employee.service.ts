import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly rootUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.rootUrl, emp);
  }

  getEmployeeList() {
    return this.http.get(this.rootUrl);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.rootUrl + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.rootUrl + `/${_id}`);
  }
}
