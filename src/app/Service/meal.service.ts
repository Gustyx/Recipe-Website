import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Meal } from '../Model/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private fs: Firestore) { }

  getMeals(): Observable<Meal[]> {
    const myCollection: any = collection(this.fs, 'meal');
    return collectionData(myCollection);
  }
  addMeal(meal: Meal) {
    const myCollection = collection(this.fs, 'meal');
    addDoc(myCollection, meal);
  }
}
