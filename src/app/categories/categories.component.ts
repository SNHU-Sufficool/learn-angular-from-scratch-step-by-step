import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CategoryModel } from "./category.model";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";

@Component({
  selector: "categories",
  styleUrls: ["./categories.scss"],
  templateUrl: "./categories.component.html",
  imports: [MatListModule, MatChipsModule, RouterModule, CommonModule],
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  categories: CategoryModel[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      let data = routeData["data"];
      if (data) {
        this.categories = data.categories;
      }
    });
  }
}
