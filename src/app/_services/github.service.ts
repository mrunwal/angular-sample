import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
//import { UserInfoRes  } from '@app/_models';
import { UserInfoRes  } from '../_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  searchUsers(searchString: string): Observable<UserInfoRes> {
    const params = new HttpParams().set('q', `${searchString} in:name type:user`); // Create new HttpParams
//    this.httpOptions.params = params;
    return this.http
      .get<UserInfoRes>(
        `${environment.apiUrl}search/users`,
        {params: params}
      )
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<UserInfoRes>('getFarmers'))
      );
  }  

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // : send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        //  better job of transforming error for user consumption
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
