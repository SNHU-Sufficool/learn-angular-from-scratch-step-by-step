import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { BreadcrumbComponent } from "./shared/breadcrumb/breadcrumb.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [MatToolbarModule, RouterModule, BreadcrumbComponent],
})
export class AppComponent {
  title = "learn-angular-from-scratch";
}
