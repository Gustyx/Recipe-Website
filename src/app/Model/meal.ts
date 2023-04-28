export class Meal {
  title: string;
  ingredientList: string[];
  description: string;
  type: string;
  
  constructor(title: string = '', ingredientList: string[] = [], description: string = '', type: string = 'all') {
    this.title = title;
    this.ingredientList = ingredientList;
    this.description = description;
    this.type = type;
  }
}
