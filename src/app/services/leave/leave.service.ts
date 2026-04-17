import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LeaveRecord} from "./leave-record";
import {environment} from "../../../environments/environment";
import {Employer} from "./employer";
import {LeaveRecordCreationRequest} from "./leave-record-creation-request";

@Injectable({providedIn: 'root'})
export class LeaveService {
  private apiUrl = environment.apiUrl;

  private readonly baseGetEmployersUrl = `${this.apiUrl}/simple-spa/v1/api/employers/all`;

  private readonly baseFindLeavesUrl = `${this.apiUrl}/simple-spa/v1/api/personalleaverecords/all`;
  private readonly baseCreateLeavesUrl = `${this.apiUrl}/simple-spa/v1/api/personalleaverecords`;
  private readonly baseDeleteLeavesUrl = `${this.apiUrl}/simple-spa/v1/api/personalleaverecords/ids`;

  constructor(private http: HttpClient) {
  }

  getLeaves(userId: number): Observable<LeaveRecord[]> {
    return this.http.get<LeaveRecord[]>(this.baseFindLeavesUrl, {params: {userId}});
  }

  createLeave(recordCreationRequest: LeaveRecordCreationRequest): Observable<LeaveRecord> {
    return this.http.post<LeaveRecord>(this.baseCreateLeavesUrl, recordCreationRequest);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete(`${this.baseDeleteLeavesUrl}/${id}`);
  }

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(this.baseGetEmployersUrl);
  }
}
