import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TextProperties } from './TextProperties';
import { SesionService } from '../services/sesionService/sesion.service';
import { ObjectModelInitializer } from './ObjectModelInitializer';

declare var $: any;

@Injectable()
export class Guardian implements CanActivate {
  constructor(private router: Router, public objectModelInitializer: ObjectModelInitializer, public textProperties: TextProperties, public sesionService: SesionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let URLactual = window.location.href;
    let sesionOK = true;

    return true;
  }
}