import { Injectable, Inject, Optional } from "@angular/core";
import { SDKModels } from "./SDKModels";
import { BaseLoopBackApi } from "../core/base.service";
import { LoopBackConfig } from "../../lb.config";
import { LoopBackAuth } from "../core/auth.service";
import { LoopBackFilter, SDKToken, AccessToken } from "../../models/BaseModels";
import { ErrorHandler } from "../core/error.service";
import { Observable } from "rxjs";
import { User } from "../../models/User";
import { HttpClient } from "@angular/common/http";

/**
 * Api services for the `User` model.
 */
@Injectable()
export class UserApi extends BaseLoopBackApi {
  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http, models, auth, errorHandler);
  }

  /**
   * Find a related item by id for accessTokens.
   *
   * @param {any} id User id
   *
   * @param {any} fk Foreign key for accessTokens
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `User` object.)
   * </em>
   */
  public findByIdAccessTokens(
    id: any,
    fk: any,
    customHeaders?: Function
  ): Observable<User> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
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
   * Delete a related item by id for accessTokens.
   *
   * @param {any} id User id
   *
   * @param {any} fk Foreign key for accessTokens
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public destroyByIdAccessTokens(
    id: any,
    fk: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens/:fk";
    let _routeParams: any = {
      id: id,
      fk: fk,
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
   * Update a related item by id for accessTokens.
   *
   * @param {any} id User id
   *
   * @param {any} fk Foreign key for accessTokens
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
   * This usually means the response is a `User` object.)
   * </em>
   */
  public updateByIdAccessTokens(
    id: any,
    fk: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens/:fk";
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
   * Queries accessTokens of User.
   *
   * @param {any} id User id
   *
   * @param {object} filter
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `User` object.)
   * </em>
   */
  public getAccessTokens(
    id: any,
    filter: LoopBackFilter = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    if (typeof filter !== "undefined" && filter !== null)
      _urlParams.filter = filter;
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
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id User id
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
   * This usually means the response is a `User` object.)
   * </em>
   */
  public createAccessTokens(
    id: any,
    data: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens";
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
   * Deletes all accessTokens of this model.
   *
   * @param {any} id User id
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public deleteAccessTokens(
    id: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens";
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
   * Counts accessTokens of User.
   *
   * @param {any} id User id
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
  public countAccessTokens(
    id: any,
    where: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens/count";
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
   * This usually means the response is a `User` object.)
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
      "/Users";
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
   * @param {any} id User id
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
   * This usually means the response is a `User` object.)
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
      "/Users/:id";
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
   * Login a user with username/email and password.
   *
   * @param {string} include Related objects to include in the response. See the description of return value for more details.
   *   Default value: `user`.
   *
   *  - `rememberMe` - `boolean` - Whether the authentication credentials
   *     should be remembered in localStorage across app/browser restarts.
   *     Default: `true`.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * The response body contains properties of the AccessToken created on login.
   * Depending on the value of `include` parameter, the body may contain additional properties:
   *
   *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
   *
   *
   */
  public login(
    credentials: any,
    include: any = "user",
    rememberMe: boolean = true,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/login";
    let _routeParams: any = {};
    let _postBody: any = {
      credentials: credentials,
    };
    let _urlParams: { [key: string]: any } = {};
    if (typeof include !== "undefined" && include !== null)
      _urlParams.include = include;
    let result = this.request(
      "POST",
      _url,
      _routeParams,
      _urlParams,
      _postBody,
      customHeaders
    ).pipe((response: any) => {
      response.ttl = parseInt(response.ttl);
      response.rememberMe = rememberMe;
      this.auth.setToken(response);
      return response;
    });
    return result;
  }

  /**
   * Logout a user with access token.
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public logout(customHeaders?: Function): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/logout";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    _urlParams.access_token = this.auth.getAccessTokenId();
    this.auth.clear();
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
   * Trigger user's identity verification with configured verifyOptions
   *
   * @param {any} id User id
   *
   * @param {object} data Request data.
   *
   * This method does not accept any data. Supply an empty object.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public verify(id: any, customHeaders?: Function): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/verify";
    let _routeParams: any = {
      id: id,
    };
    let _postBody: any = {};
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
   * Confirm a user registration with identity verification token.
   *
   * @param {string} uid
   *
   * @param {string} token
   *
   * @param {string} redirect
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public confirm(
    uid: any,
    token: any,
    redirect: any = {},
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/confirm";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: { [key: string]: any } = {};
    if (typeof uid !== "undefined" && uid !== null) _urlParams.uid = uid;
    if (typeof token !== "undefined" && token !== null)
      _urlParams.token = token;
    if (typeof redirect !== "undefined" && redirect !== null)
      _urlParams.redirect = redirect;
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
   * Reset password for a user with email.
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public resetPassword(
    options: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/reset";
    let _routeParams: any = {};
    let _postBody: any = {
      options: options,
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
   * Change a user's password.
   *
   * @param {object} data Request data.
   *
   *  - `oldPassword` – `{string}` -
   *
   *  - `newPassword` – `{string}` -
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public changePassword(
    oldPassword: any,
    newPassword: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/change-password";
    let _routeParams: any = {};
    let _postBody: any = {
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
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
   * Reset user's password via a password-reset token.
   *
   * @param {object} data Request data.
   *
   *  - `newPassword` – `{string}` -
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * This method returns no data.
   */
  public setPassword(
    newPassword: any,
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/reset-password";
    let _routeParams: any = {};
    let _postBody: any = {
      data: {
        newPassword: newPassword,
      },
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
   * Creates a new instance in accessTokens of this model.
   *
   * @param {any} id User id
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
   * This usually means the response is a `User` object.)
   * </em>
   */
  public createManyAccessTokens(
    id: any,
    data: any[] = [],
    customHeaders?: Function
  ): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users/:id/accessTokens";
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
   * @ngdoc method
   * @name sdk.User#getCurrent
   * @methodOf sdk.User
   *
   * @description
   *
   * Get data of the currently logged user. Fail with HTTP result 401
   * when there is no user logged in.
   *
   * @returns object An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   */
  public getCurrent(filter: LoopBackFilter = {}): Observable<any> {
    let _url: string =
      LoopBackConfig.getPath() +
      "/" +
      LoopBackConfig.getApiVersion() +
      "/Users" +
      "/:id";
    let id: any = this.auth.getCurrentUserId();
    if (id == null) id = "__anonymous__";
    let _routeParams: any = { id: id };
    let _urlParams: { [key: string]: any } = {};
    let _postBody: any = {};
    if (filter) _urlParams.filter = filter;
    return this.request("GET", _url, _routeParams, _urlParams, _postBody);
  }
  /**
   * Get data of the currently logged user that was returned by the last
   * call to {@link sdk.User#login} or
   * {@link sdk.User#getCurrent}. Return null when there
   * is no user logged in or the data of the current user were not fetched
   * yet.
   *
   * @returns object An Account instance.
   */
  public getCachedCurrent() {
    return this.auth.getCurrentUserData();
  }
  /**
   * Get data of the currently logged access tokern that was returned by the last
   * call to {@link sdk.User#login}
   *
   * @returns object An AccessToken instance.
   */
  public getCurrentToken(): AccessToken {
    return this.auth.getToken();
  }
  /**
   * @name sdk.User#isAuthenticated
   *
   * @returns {boolean} True if the current user is authenticated (logged in).
   */
  public isAuthenticated() {
    return !(
      this.getCurrentId() === "" ||
      this.getCurrentId() == null ||
      this.getCurrentId() == "null"
    );
  }

  /**
   * @name sdk.User#getCurrentId
   *
   * @returns object Id of the currently logged-in user or null.
   */
  public getCurrentId() {
    return this.auth.getCurrentUserId();
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public getModelName() {
    return "User";
  }
}
