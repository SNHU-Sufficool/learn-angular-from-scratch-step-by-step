/* tslint:disable */
import { Injectable, Inject, Optional } from "@angular/core";
import { SDKModels } from "./SDKModels";
import { BaseLoopBackApi } from "../core/base.service";
import { LoopBackConfig } from "../../lb.config";
import { LoopBackAuth } from "../core/auth.service";
import { LoopBackFilter } from "../../models/BaseModels";
import { ErrorHandler } from "../core/error.service";
import { Observable } from "rxjs";
import { Question } from "../../models/Question";
import { Answer } from "../../models/Answer";
import { HttpClient } from "@angular/common/http";

/**
 * Api services for the `Question` model.
 */
@Injectable()
export class QuestionApi extends BaseLoopBackApi {
  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, models, auth, errorHandler);
  }

  /**
   * Find a related item by id for answers.
   *
   * @param {any} id question id
   *
   * @param {any} fk Foreign key for answers
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Question` object.)
   * </em>
   */
  public findByIdAnswers(
    id: any,
    fk: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    let result = this.request<Question>(
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
   * Delete a related item by id for answers.
   *
   * @param {any} id question id
   *
   * @param {any} fk Foreign key for answers
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdAnswers(
    id: any,
    fk: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    let result = this.request<Question>(
      "DELETE",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Update a related item by id for answers.
   *
   * @param {any} id question id
   *
   * @param {any} fk Foreign key for answers
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Question` object.)
   * </em>
   */
  public updateByIdAnswers(
    id: any,
    fk: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk,
    };
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request(
      "PUT",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Queries answers of question.
   *
   * @param {any} id question id
   *
   * @param {object} filter
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Question` object.)
   * </em>
   */
  public getAnswers(
    id: any,
    filter: LoopBackFilter = {},
    customHeaders?: Function
  ): Observable<any> {
    let _method: string = "GET";
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    if (typeof filter !== "undefined" && filter !== null)
      _urlParams.filter = filter;
    let result = this.request<Answer[]>(
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
   * Creates a new instance in answers of this model.
   *
   * @param {any} id question id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Question` object.)
   * </em>
   */
  public createAnswers(
    id: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request<Answer>(
      "POST",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Deletes all answers of this model.
   *
   * @param {any} id question id
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteAnswers(id: any, customHeaders?: Function): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    let result = this.request(
      "DELETE",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    );
    return result;
  }

  /**
   * Counts answers of question.
   *
   * @param {any} id question id
   *
   * @param {object} where Criteria to match model instances
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `count` – `{number}` -
   */
  public countAnswers(
    id: any,
    where: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers/count";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    if (typeof where !== "undefined" && where !== null)
      _urlParams.where = where;
    let result = this.request(
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
   * This usually means the response is a `Question` object.)
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
      "/questions";
    let _routeParams: any = {};
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request(
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
   * @param {any} id question id
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
   * This usually means the response is a `Question` object.)
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
      "/questions/:id";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request(
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
   * Creates a new instance in answers of this model.
   *
   * @param {any} id question id
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Question` object.)
   * </em>
   */
  public createManyAnswers(
    id: any,
    data: any[] = [],
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/questions/:id/answers";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {
      data: data,
    };
    let _urlParams: { [key: string]: any } = {};
    let result = this.request(
      "POST",
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
   * i.e. `Question`.
   */
  public getModelName() {
    return "Question";
  }
}
