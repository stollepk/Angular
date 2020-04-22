import { Injectable } from '@angular/core';
import {finalize, map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {TokenInfo, UserInfo} from '../models';
import {UserService} from './user.service';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private appConfig: AppConfig,
              private userService: UserService,
              private localStorageService: LocalStorageService) { }

  login(username: string, password: string) {
    return this.http.post<TokenInfo>(`${this.appConfig.API_LOGIN}`, {username, password})
      .pipe(
        mergeMap(tokenInfo => {
          if (tokenInfo && tokenInfo.accessToken) {
            this.localStorageService.saveTokenInfo(tokenInfo);
            return this.userService
              .getUserInfo()
              .pipe(map(userInfo => {
                if (userInfo) {
                  this.localStorageService.saveUserInfo(userInfo);
                  return userInfo;
                } else {
                  throw Error('User info object is null');
                }
              }));
          } else {
            throw Error('Token info object is null');
          }
        })
      );
  }

  logout() {
    return this.http.get<any>(`${this.appConfig.API_LOGOUT}`)
      .pipe(
        finalize(() => {
          // remove user from local storage to log user out
          this.localStorageService.clean();
        }));
  }

  get isLogged(): boolean {
    return this.tokenInfo != null;
  }

  get currentUser(): UserInfo {
    return this.localStorageService.userInfo;
  }

  get tokenInfo(): TokenInfo {
    return this.localStorageService.tokenInfo;
  }

}
