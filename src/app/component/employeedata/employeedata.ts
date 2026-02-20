import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';  
export interface Employee {
  employee_id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactno: string;
  city: string;
  address: string;
}
@Component({
  selector: 'app-employeedata',
  imports: [CommonModule,FormsModule],
  templateUrl: './employeedata.html',
  styleUrl: './employeedata.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class Employeedata implements OnInit {

  @ViewChild('empModel') empModel: ElementRef | undefined;
  constructor(private cdr: ChangeDetectorRef) {}

  employeeObj:Employee ={
    "employee_id": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "contactno": "",
    "city": "",
    "address": ""
  }
  addEmployeeObj: Employee  = {
    "employee_id": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "contactno": "",
    "city": "",
    "address": ""
};
  editEmployeeObj:Employee  = {
    "employee_id": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "contactno": "",
    "city": "",
    "address": ""
};
http = inject(HttpClient);


  
  employeeList:Employee[]=[];
  ngOnInit(): void {
    this.http.get<Employee[]>("https://localhost:7117/api/EmployeeMaster ")
    .subscribe({
      next: (res : any) => {
        this.employeeList = [...res];  // 👈 must match your @for variable
        this.cdr.detectChanges();
        console.log('in next',this.employeeList)
      },
      error: (err) =>  console.error(err)
    });
    console.log('outside next',this.employeeList)
  }
  openModel() {
    this.resetForm();
    if (this.empModel) {
      this.empModel.nativeElement.style.display = 'block';
    }
  }

   CloseModel() {
    if (this.empModel) {
      this.empModel.nativeElement.style.display = 'none';
    }
  }

  getAllEmployee(){
    this.http.get("https://localhost:7117/api/EmployeeMaster").subscribe((res:any)=>{
      this.employeeList = res;
    })
  }
  onSave() {
  this.http.post("https://localhost:7117/api/EmployeeMaster", this.addEmployeeObj)
    .subscribe({
      next: (res: any) => {
        console.log("Employee Added:", res);
        this.getAllEmployee();
        this.resetForm();
        // Close modal manually
        let closeBtn = document.querySelector('#addEmployeeModal .btn-close') as HTMLElement;
        if (closeBtn) closeBtn.click();
      },
      error: (err) => {
        console.error("Error while adding employee:", err);
      }
    });
}

  onUpdate(){
    this.http.put("https://localhost:7117/api/EmployeeMaster/" +this.editEmployeeObj.employee_id, this.editEmployeeObj).subscribe((res:any)=>{
      console.log(res);
      this.getAllEmployee();
      this.CloseModel();
    })
  }
  deleteEmployee(item:any){
    const isDelete = confirm("Are you sure to delete this record?");
    if(isDelete){
      this.http.delete("https://localhost:7117/api/EmployeeMaster/"+item.employee_id).subscribe((res:any)=>{
        console.log(res);
        this.getAllEmployee();
      })
    }
  }
  editEmployee(item:any){
    this.editEmployeeObj = item;
    this.openModel();
  }
  resetForm(){
    this.employeeObj = {
      "employee_id": 0,
      "firstName": "",
      "lastName": "",
      "email": "",
      "contactno": "",
      "city": "",
      "address": ""
  };
  }



}