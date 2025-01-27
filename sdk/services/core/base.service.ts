import { ErrorHandler } from "./error.service";
import { LoopBackAuth } from "./auth.service";
import { LoopBackConfig } from "../../lb.config";
import { LoopBackFilter } from "../../models/BaseModels";
import { SDKModels } from "../custom/SDKModels";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable, Subject } from "rxjs";
// import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;
/**
 * @module BaseLoopBackApi
 * @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
 * @author Nikolay Matiushenkov <https://github.com/mnvx>
 * @license MIT
 * @description
 * Abstract class that will be implemented in every custom service automatically built
 * by the sdk builder.
 * It provides the core functionallity for every API call, either by HTTP Calls or by
 * WebSockets.
 **/
@Injectable()
export abstract class BaseLoopBackApi {
  protected path: string;
  protected model: any;

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    this.model = this.models.get(this.getModelName());
  }
  /**
   * @method request
   * @param {string}  method      Request method (GET, POST, PUT)
   * @param {string}  url         Request url (my-host/my-url/:id)
   * @param {any}     routeParams Values of url parameters
   * @param {any}     urlParams   Parameters for building url (filter and other)
   * @param {any}     postBody    Request postBody
   * @return {Observable<any>}
   * @description
   * This is a core method, every HTTP Call will be done from here, every API Service will
   * extend this class and use this method to get RESTful communication.
   **/
  public request<T>(
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
    url: string,
    routeParams: any = {},
    urlParams: any = {},
    postBody: any = {},
    customHeaders?: Function
  ): Observable<any> {
    // Transpile route variables to the actual request Values
    Object.keys(routeParams).forEach((key: string) => {
      url = url.replace(
        new RegExp(":" + key + "(/|$)", "g"),
        routeParams[key] + "$1"
      );
    });

    // Headers to be sent
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });
    // Authenticate request
    this.authenticate(url, headers);

    // Body fix for built in remote methods using "data", "options" or "credentials
    // that are the actual body, Custom remote method properties are different and need
    // to be wrapped into a body object

    let body: any;
    let postBodyKeys =
      typeof postBody === "object" ? Object.keys(postBody) : [];
    if (postBodyKeys.length === 1) {
      body = postBody[postBodyKeys.shift()];
    } else {
      body = postBody;
    }
    let filter: string = "";
    // Separate filter object from url params and add to search query
    if (urlParams.filter) {
      if (LoopBackConfig.isHeadersFilteringSet()) {
        headers.append("filter", JSON.stringify(urlParams.filter));
      } else {
        filter = `?filter=${encodeURIComponent(
          JSON.stringify(urlParams.filter)
        )}`;
      }
      delete urlParams.filter;
    }
    // Separate where object from url params and add to search query
    if (typeof customHeaders === "function") {
      headers = customHeaders(headers);
    }

    let options = {
      headers: headers,
      params: Object.keys(urlParams).length > 0 ? urlParams : undefined,
      withCredentials: LoopBackConfig.getRequestOptionsCredentials(),
      responseType: "json" as const,
      observe: "body" as const,
    };

    switch (method) {
      case "DELETE":
        return this.http.delete<T>(`${url}${filter}`, options);
      case "POST":
        return this.http.post<T>(
          `${url}${filter}`,
          body ? JSON.stringify(body) : undefined,
          options
        );
      case "GET":
        return this.http.get<T>(`${url}${filter}`, options);
      case "PUT":
        return this.http.put<T>(
          `${url}${filter}`,
          body ? JSON.stringify(body) : undefined,
          options
        );
      case "PATCH":
        return this.http.put<T>(
          `${url}${filter}`,
          body ? JSON.stringify(body) : undefined,
          options
        );
    }
  }

  public authenticate<T>(url: string, headers: HttpHeaders): void {
    if (this.auth.getAccessTokenId()) {
      headers.append(
        "Authorization",
        LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId()
      );
    }
  }
  /**
   * @method create
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T} data Generic data type
   * @return {Observable<T>}
   * @description
   * Generic create method
   */
  public create<T>(data: T, customHeaders?: Function): Observable<T> {
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
      ].join("/"),
      undefined,
      undefined,
      { data },
      customHeaders
    ).pipe(this.model.factory);
  }
  /**
   * @method createMany
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {T[]} data Generic data type array
   * @return {Observable<T[]>}
   * @description
   * Generic create many method
   */
  public createMany<T>(data: T[], customHeaders?: Function): Observable<T[]> {
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
      ].join("/"),
      undefined,
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method findById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @param {any} data Generic data type
   * @return {Observable<T>}
   * @description
   * Generic findById method
   */
  public findById<T>(
    id: any,
    filter: LoopBackFilter = {},
    customHeaders?: Function
  ): Observable<T> {
    let _urlParams: { [key: string]: any } = {};
    if (filter) _urlParams.filter = filter;
    return this.request(
      "GET",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        ":id",
      ].join("/"),
      { id },
      _urlParams,
      undefined,
      customHeaders
    );
  }
  /**
   * @method find
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T[+>}
   * @description
   * Generic find method
   */
  public find<T>(
    filter: LoopBackFilter = {},
    customHeaders?: Function
  ): Observable<T[]> {
    return this.request(
      "GET",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
      ].join("/"),
      undefined,
      { filter },
      undefined,
      customHeaders
    );
  }
  /**
   * @method exists
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T[]>}
   * @description
   * Generic exists method
   */
  public exists<T>(id: any, customHeaders?: Function): Observable<T> {
    return this.request(
      "GET",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        ":id/exists",
      ].join("/"),
      { id },
      undefined,
      undefined,
      customHeaders
    );
  }
  /**
   * @method findOne
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic findOne method
   */
  public findOne<T>(
    filter: LoopBackFilter = {},
    customHeaders?: Function
  ): Observable<T> {
    return this.request(
      "GET",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        "findOne",
      ].join("/"),
      undefined,
      { filter },
      undefined,
      customHeaders
    );
  }
  /**
   * @method updateAll
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T[]>}
   * @description
   * Generic updateAll method
   */
  public updateAll<T>(
    where: any = {},
    data: T,
    customHeaders?: Function
  ): Observable<{ count: "number" }> {
    let _urlParams: { [key: string]: any } = {};
    if (where) _urlParams.where = where;
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        "update",
      ].join("/"),
      undefined,
      _urlParams,
      { data },
      customHeaders
    );
  }
  /**
   * @method deleteById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic deleteById method
   */
  public deleteById<T>(id: any, customHeaders?: Function): Observable<T> {
    return this.request(
      "DELETE",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        ":id",
      ].join("/"),
      { id },
      undefined,
      undefined,
      customHeaders
    );
  }
  /**
   * @method count
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<{ count: number }>}
   * @description
   * Generic count method
   */
  public count(
    where: any = {},
    customHeaders?: Function
  ): Observable<{ count: number }> {
    let _urlParams: { [key: string]: any } = {};
    if (where) _urlParams.where = where;
    return this.request(
      "GET",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        "count",
      ].join("/"),
      undefined,
      _urlParams,
      undefined,
      customHeaders
    );
  }
  /**
   * @method updateAttributes
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic updateAttributes method
   */
  public updateAttributes<T>(
    id: any,
    data: T,
    customHeaders?: Function
  ): Observable<T> {
    return this.request(
      "PUT",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        ":id",
      ].join("/"),
      { id },
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method upsert
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic upsert method
   */
  public upsert<T>(data: any = {}, customHeaders?: Function): Observable<T> {
    return this.request(
      "PUT",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
      ].join("/"),
      undefined,
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method upsertPatch
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic upsert method using patch http method
   */
  public upsertPatch<T>(
    data: any = {},
    customHeaders?: Function
  ): Observable<T> {
    return this.request(
      "PATCH",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
      ].join("/"),
      undefined,
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method upsertWithWhere
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic upsertWithWhere method
   */
  public upsertWithWhere<T>(
    where: any = {},
    data: any = {},
    customHeaders?: Function
  ): Observable<T> {
    let _urlParams: { [key: string]: any } = {};
    if (where) _urlParams.where = where;
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        "upsertWithWhere",
      ].join("/"),
      undefined,
      _urlParams,
      { data },
      customHeaders
    );
  }
  /**
   * @method replaceOrCreate
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic replaceOrCreate method
   */
  public replaceOrCreate<T>(
    data: any = {},
    customHeaders?: Function
  ): Observable<T> {
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        "replaceOrCreate",
      ].join("/"),
      undefined,
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method replaceById
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<T>}
   * @description
   * Generic replaceById method
   */
  public replaceById<T>(
    id: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<T> {
    return this.request(
      "POST",
      [
        LoopBackConfig.getPath(),
        LoopBackConfig.getApiVersion(),
        this.model.getModelDefinition().path,
        ":id",
        "replace",
      ].join("/"),
      { id },
      undefined,
      { data },
      customHeaders
    );
  }
  /**
   * @method createChangeStream
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {Observable<any>}
   * @description
   * Generic createChangeStream method
   */
  public createChangeStream(): Observable<any> {
    let subject = new Subject();
    if (typeof EventSource !== "undefined") {
      let emit = (msg: any) => subject.next(JSON.parse(msg.data));
      var source = new EventSource(
        [
          LoopBackConfig.getPath(),
          LoopBackConfig.getApiVersion(),
          this.model.getModelDefinition().path,
          "change-stream",
        ].join("/")
      );
      source.addEventListener("data", emit);
      source.onerror = emit;
    } else {
      console.warn("SDK Builder: EventSource is not supported");
    }
    return subject.asObservable();
  }
  /**
   * @method getModelName
   * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
   * @license MIT
   * @return {string}
   * @description
   * Abstract getModelName method
   */
  abstract getModelName(): string;
}
