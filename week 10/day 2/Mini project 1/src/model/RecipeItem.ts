import { v4 as uuidv4 } from 'uuid'

export class RecipeItem {
  readonly id: string

  constructor(
    public title: string,
    public ingredients: string[],
    public instructions: string,
    public isFavorite = false,
    id = uuidv4(),
  ) {
    this.id = id
  }
}
