export class CategoryModel {
  slug: string;
  title: string;
  image: string;
  description: string;
  tags: Array<CategoryTag>; // was <Object>
}

export interface CategoryTag {
  name: string;
}
