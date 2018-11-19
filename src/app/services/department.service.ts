import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoints } from '../helpers/constants';
import { DepartmentModel } from '../models/department.model';
import { AuthBearerAndContentTypeJsonHeaders } from '../helpers/httpHeaders';

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<DepartmentModel[]> {
    return this._httpClient
      .get<DepartmentModel[]>(
        `${Endpoints.departmentUrl}`,
        AuthBearerAndContentTypeJsonHeaders.options
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  getDepartment(id: string): Observable<DepartmentModel> {
    return this._httpClient
      .get<DepartmentModel>(`${Endpoints.departmentUrl}${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  postDepartment(department: DepartmentModel): Observable<any> {
    return this._httpClient
      .post<DepartmentModel>(`${Endpoints.departmentUrl}`, department)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  putDepartment(department: DepartmentModel): Observable<any> {
    console.log('DEPT ID IS ', department.id);
    return this._httpClient
      .put<DepartmentModel>(
        `${Endpoints.departmentUrl}${department.id}`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  deleteDepartment(id: string): Observable<any> {
    return this._httpClient
      .delete<DepartmentModel>(`${Endpoints.departmentUrl}${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }
}
