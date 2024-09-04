// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../envs/env';
import { UserResponse } from '../models/userResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${env.baseURL}user/getUser`;

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string, token: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserResponse>(`${this.apiUrl}/${email}`, { headers });
  }
}
