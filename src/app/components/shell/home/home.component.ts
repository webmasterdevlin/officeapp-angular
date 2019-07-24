import { Component, OnInit } from "@angular/core";
import { DepartmentService } from "../../../services/department.service";
import { DepartmentModel } from "../../../models/department.model";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  departments: DepartmentModel[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departmentService
      .loadDepartments()
      .subscribe(data => (this.departments = data));
  }

  removeItem(id: string, name: string): void {
    const confirmed = confirm(`Delete ${name}?`);

    if (confirmed) {
      this.removeFromDatabase(id);
    }
  }

  private removeFromDatabase(id: string): void {
    const index = this.departments.findIndex(d => d.id === id);
    const departmentToRemove = this.departments.find(d => d.id === id);

    // Optimistic update
    this.departments.splice(index, 1);

    this.departmentService
      .deleteDepartment(id)
      .pipe(
        catchError( () =>
          // Rollback
          this.departments.splice(index, 0, departmentToRemove)
        )
      )
      .subscribe();
  }
}
