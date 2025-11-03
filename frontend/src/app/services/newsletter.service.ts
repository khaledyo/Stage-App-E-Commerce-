import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  constructor(private http: HttpClient) {}

  sendTestEmail(email: string): Observable<any> {
    return this.http.post(environment.apiUrl+"/send-email",{ email });
  }
}
