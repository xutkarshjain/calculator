import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDetailsService {

  private itemToUpdateSubject = new BehaviorSubject<any>(null);
  itemToUpdate$: Observable<any> = this.itemToUpdateSubject.asObservable();

  constructor() { }

  changeItemToUpdate(newValue: any) {
    this.itemToUpdateSubject.next(newValue);
  }

}
