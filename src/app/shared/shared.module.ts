import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HttpClient } from "@angular/common/http";

import { SlugifyPipe } from "../shared/slugify.pipe";
// Material modules
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";

import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SDKBrowserModule } from "sdk";

@NgModule({
  declarations: [],
  imports: [
    SlugifyPipe,
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    SDKBrowserModule.forRoot(), // Obsolete Loopback SDK import

    BrowserAnimationsModule,
  ],
  providers: [SlugifyPipe, HttpClient],
  exports: [
    BreadcrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Material modules
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
  ],
})
export class SharedModule {}
