import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../model/user";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

const AUTH_USER = 'auth_private_user';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    private subject = new BehaviorSubject<IUser>(null);
    user$: Observable<IUser> = this.subject.asObservable();
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private http: HttpClient) {
        const userAsString = localStorage.getItem(AUTH_USER);
        if (userAsString)
            this.subject.next(JSON.parse(userAsString));

        this.isLoggedIn$ = this.user$
            .pipe(
                map(user => !!user)
            );
        this.isLoggedOut$ = this.isLoggedIn$
            .pipe(
                map(loggedIn => !loggedIn)
            );
    }

    login(email: string, password: string): Observable<IUser> {
        return this.http.post<IUser>('/api/login', { email, password })
            .pipe(
                tap(user => {
                    this.subject.next(user);
                    localStorage.setItem(AUTH_USER, JSON.stringify(user));
                }),
                shareReplay()
            );
    }

    logout() {
        this.subject.next(null);
        localStorage.removeItem(AUTH_USER);
    }
}