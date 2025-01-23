import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return undefined;
    }

    loadingOff() {
        this.loadingSubject.next(false);
    }

    loadingOn() {
        this.loadingSubject.next(true);
    }
}