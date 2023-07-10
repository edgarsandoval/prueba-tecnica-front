import { Injectable } from '@angular/core';
import * as lscache from 'lscache';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAuthenticated(): boolean {
    let token = lscache.get('token');
    return this.isTokenValid(token);
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return !!decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
