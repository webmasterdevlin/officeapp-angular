import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, Subscription } from 'rxjs/';
import { Location } from "@angular/common";
import { DepartmentModel } from "../../../models/department.model";
import { DepartmentService } from "../../../services/department.service";

@Component({
  selector: "app-edit-department",
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.css"]
})
export class EditDepartmentComponent implements OnInit, OnDestroy {
  department$: Observable<DepartmentModel>;
  departmentForm: FormGroup;
  id: string;
  sub: Subscription;

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _departmentService: DepartmentService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getDepartmentFromRoute();
    this.formBuilderInit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    this.updateDepartment();
  }

  back(): void {
    this._location.back();
  }

  private getDepartmentFromRoute(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get("id");
    this.sub = this._departmentService
      .getDepartment(this.id)
      .subscribe(data => {
              this.departmentForm.patchValue(data)
      });
  }

  private updateDepartment() {
    const department = <DepartmentModel>this.departmentForm.value;
    this._departmentService.putDepartment(department).subscribe();
    this.back();
  }

  private formBuilderInit(): void {
    this.departmentForm = this._fb.group({
      id: [""],
      name: [""],
      description: [""],
      head: [""],
      code: [""]
    });
  }
}
