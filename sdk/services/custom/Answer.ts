import { Injectable, Inject, Optional } from "@angular/core";
import { SDKModels } from "./SDKModels";
import { BaseLoopBackApi } from "../core/base.service";
import { LoopBackConfig } from "../../lb.config";
import { LoopBackAuth } from "../core/auth.service";
import { ErrorHandler } from "../core/error.service";
import { Observable } from "rxjs";
import { Answer } from "../../models/Answer";
import { HttpClient } from "@angular/common/http";

/**
 * Api services for the `Answer` model.
 */
@Injectable()
export class AnswerApi extends BaseLoopBackApi {
  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, models, auth, errorHandler);
  }

  /**
   * Fetches belongsTo relation question.
   *
   * @param {any} id answer id
   *
   * @param {boolean} refresh
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Answer` object.)
   * </em>
   */
  public getQuestion(
    id: any,
    refresh: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _method: string = "GET";
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/answers/:id/question";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    if (typeof refresh !== "undefined" && refresh !== null)
      _urlParams.refresh = refresh;
    let result = this.request<Answer>(
      "GET",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Patch an existing model instance or insert a new one into the data source.
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - Model instance data
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Answer` object.)
   * </em>
   */
  public patchOrCreate(
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/answers";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request<Answer>(
      "PATCH",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Patch attributes for a model instance and persist it into the data source.
   *
   * @param {any} id answer id
   *
   * @param {object} data Request data.
   *
   *  - `data` – `{object}` - An object of model property name/value pairs
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Answer` object.)
   * </em>
   */
  public patchAttributes(
    id: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/answers/:id";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request<Answer>(
      "PATCH",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Answer`.
   */
  public getModelName() {
    return "Answer";
  }
}
