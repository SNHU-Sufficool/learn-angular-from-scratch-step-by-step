import { Injectable } from "@angular/core";
/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
  // I'm leaving any for now to avoid breaking apps using both versions
  public handleError(error: any): any {
    return "Server error";
  }
}
