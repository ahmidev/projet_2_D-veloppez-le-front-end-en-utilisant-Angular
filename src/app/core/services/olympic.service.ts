import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient,  private router: Router) {}

  loadInitialData() {
    this.isLoading$.next(true); 
    this.errorMessage$.next(null); 

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value); 
        this.isLoading$.next(false); 
      }),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        this.isLoading$.next(false); 
        if (error.status === 404) {
          this.errorMessage$.next('URL non trouvée. Redirection vers la page Not Found.');
          this.router.navigate(['/not-found']);
        } else {
          this.errorMessage$.next('Échec du chargement des données olympiques. Veuillez réessayer plus tard.');
        }
        
        
        return of([]);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  getErrorMessage$(): Observable<string | null> {
    return this.errorMessage$.asObservable();
  }
}
