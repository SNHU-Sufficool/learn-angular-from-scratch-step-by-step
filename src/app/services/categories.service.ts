import { Injectable } from "@angular/core";
import { CategoryModel } from "../categories/category.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>("./assets/categories.json");
  }

  getCategoryBySlug(slug: string): Observable<CategoryModel> {
    return this.getCategories().pipe(
      map((category) => category.find((c) => c.slug === slug))
    );
  }
}
