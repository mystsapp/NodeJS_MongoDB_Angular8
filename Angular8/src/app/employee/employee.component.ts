import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null

    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.service.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);

        this.refreshEmployeeList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
      });
    } else {
      this.service.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);

        this.refreshEmployeeList();
        M.toast({ html: 'Updated Successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.service.getEmployeeList().subscribe((res) => {
      this.service.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.service.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted Successfully', classes: 'rounded' });
      });
    }
  }

}
