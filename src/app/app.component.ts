import { Component } from '@angular/core';
import { Meal } from './Model/meal';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MealDialogComponent, MealDialogResult } from './meal-dialog/meal-dialog.component';
import { MealService } from './Service/meal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog, private mealService: MealService) { }

  title = 'WebProjekt';
  panelOpenState = false;
  new: Meal[] = [];
  breakfast: Meal[] = [];
  lunch: Meal[] = [];
  dinner: Meal[] = [];
  meal: Meal = new Meal;
  viewIngredientList: boolean = false;
  viewDescription: boolean = false;
  mealsFromDB: Meal[] = [];
  breakfastFromDB: Meal[] = [];
  lunchFromDB: Meal[] = [];
  dinnerFromDB: Meal[] = [];
  newMealTitle: string = '';
  newMealIngredientList: string[] = [];
  newMealDescription: string = '';
  newMealType: string = '';
  viewDBMeals: boolean = true;
  viewDBMealsBreakfast: boolean = false;
  viewDBMealsLunch: boolean = false;
  viewDBMealsDinner: boolean = false;


  drop(event: CdkDragDrop<Meal[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState;
  }
  stopHeaderClick(event: Event): void {
    event.stopPropagation();
  }

  newMeal(): void {
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '420px',
      data: {
        meal: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: MealDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.newMealTitle = result.meal.title;
        this.newMealType = result.meal.type;
        this.newMealDescription = result.meal.description;
        //for (let ingredient of result.meal.ingredientList) {
          //this.newMealIngredientList.push(ingredient);
        //}
        this.newMealIngredientList = Object.assign([], result.meal.ingredientList);
        this.new.push(result.meal);
        this.addMeal();
      });
  }

  editMeal(list: 'new' | 'breakfast' | 'lunch' | 'dinner', meal: Meal): void {
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '270px',
      data: {
        meal,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: MealDialogResult | undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const mealIndex = dataList.indexOf(meal);
      if (result.delete) {
        dataList.splice(mealIndex, 1);
      } else {
        dataList[mealIndex] = meal;
      }
    });
  }

  addMeal() {
    let newMeal = { title: this.newMealTitle, ingredientList: this.newMealIngredientList, description: this.newMealDescription, type: 'all' };
    this.mealService.addMeal(newMeal);
  }

  getMeals() {
    this.mealService.getMeals().subscribe(result => {
      this.mealsFromDB = result;
    });
  }

  getBreakfast() {
    this.viewDBMealsBreakfast = !this.viewDBMealsBreakfast;
    if (this.viewDBMealsBreakfast === true) {
      this.getMeals();
      for (var meal of this.mealsFromDB) {
        if (meal.type === 'breakfast' || meal.type === 'all')
          this.breakfastFromDB.push(meal);
      }
    }
    else {
      this.breakfastFromDB = [];
      this.breakfast = [];
    }
  }

  getLunch() {
    this.viewDBMealsLunch = !this.viewDBMealsLunch;
    if (this.viewDBMealsLunch === true) {
      this.getMeals();
      for (var meal of this.mealsFromDB) {
        if (meal.type === 'lunch' || meal.type === 'all')
          this.lunchFromDB.push(meal);
      }
    }
    else {
      this.lunchFromDB = [];
      this.lunch = [];
    }
  }

  getDinner() {
    this.viewDBMealsDinner = !this.viewDBMealsDinner;
    if (this.viewDBMealsDinner === true) {
      this.getMeals();
      for (var meal of this.mealsFromDB) {
        if (meal.type === 'dinner' || meal.type === 'all')
          this.dinnerFromDB.push(meal);
      }
    }
    else {
      this.dinnerFromDB = [];
      this.dinner = [];
    }
  }
}
