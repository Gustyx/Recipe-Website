import { Component, Inject, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from '../Model/meal';


@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.css']
})
export class MealDialogComponent {
  buttonClicked: boolean = false;
  ingredientOptions: boolean = false;
  inputName: string = '';
  inputQuantity: string = '';
  inputMeasure: string = '';
  ingredientList: string[] = [];
  ingredientNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MealDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MealDialogData
  ) { }

  addedIngredient(): void {
    this.ingredientList.push(this.inputName + ' ' + this.inputQuantity + ' ' + this.inputMeasure);
    this.ingredientNames.push(this.inputName + ' ' + this.inputQuantity + ' ' + this.inputMeasure);
    this.ingredientOptions = false;
}

  cancel(): void {
    this.dialogRef.close();
  }
}
export interface MealDialogData {
  meal: Partial<Meal>;
  enableDelete: boolean;
}

export interface MealDialogResult {
  meal: Meal;
  delete?: boolean;
}
