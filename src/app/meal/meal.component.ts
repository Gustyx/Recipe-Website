import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from '../Model/meal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent {
  @Input() meal: Meal | null = null;
  @Output() edit = new EventEmitter<Meal>();
}
