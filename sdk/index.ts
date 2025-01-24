import { LoopBackAuth } from "./services/core/auth.service";
import { LoggerService } from "./services/custom/logger.service";
import { SDKModels } from "./services/custom/SDKModels";
import { InternalStorage, SDKStorage } from "./storage/storage.swaps";
import { CommonModule } from "@angular/common";
import { CookieBrowser } from "./storage/cookie.browser";
import { StorageBrowser } from "./storage/storage.browser";
import { UserApi } from "./services/custom/User";
import { QuestionApi } from "./services/custom/Question";
import { AnswerApi } from "./services/custom/Answer";
import { ModuleWithProviders, NgModule } from "@angular/core";
/**
 * @module SDKBrowserModule
 * @description
 * This module should be imported when building a Web Application in the following scenarios:
 *
 *  1.- Regular web application
 *  2.- Angular universal application (Browser Portion)
 *  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
 **/
@NgModule({
  imports: [CommonModule],
})
export class SDKBrowserModule {
  static forRoot(
    internalStorageProvider: any = {
      provide: InternalStorage,
      useClass: CookieBrowser,
    }
  ): ModuleWithProviders<any> {
    return {
      ngModule: SDKBrowserModule,
      providers: [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        UserApi,
        QuestionApi,
        AnswerApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
      ],
    };
  }
}
/**
 * Have Fun!!!
 * - Jon
 **/
export * from "./models/index";
export * from "./services/index";
export * from "./lb.config";
export * from "./storage/storage.swaps";
export { CookieBrowser } from "./storage/cookie.browser";
export { StorageBrowser } from "./storage/storage.browser";
