import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
// import { UserLayersService } from "src/app/services/userlayers/userlayers.service";
// import { UserLayer } from "src/app/services/userlayers/userlayer.config";
// import { LayersService } from "src/app/services/layers/layers.service";
// import { Layer } from "src/app/services/layers/layer.interface";
// import { Query, QueryBuilder } from "src/app/common/query/query.type";

// export const MapPageResolver: ResolveFn<{ layers: { name: string, layers: Layer[] }[], userLayers: UserLayer[] }> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     layersService: LayersService = inject(LayersService),
//     userLayersService: UserLayersService = inject(UserLayersService)
// ): Observable<{ layers: { name: string, layers: Layer[] }[], userLayers: UserLayer[] }> => {
//     const layers = layersService.processed();
//     const query: Query<UserLayer> = {
//         $limit: 1000,
//         $sort: { created: -1 },
//         hidden: false
//     }
//     const userLayers = userLayersService.find(new QueryBuilder(query).getQuery());
//     const sharedWithMe = userLayersService.sharedWithMe();
//     return forkJoin({ layers, userLayers, sharedWithMe });
// }

// export const TokenResolver: ResolveFn<boolean> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
//   loginService: LoginService
// ): Observable<boolean> => {
//   console.log('Called the resolver here', route);

//   return loginService.checkToken();
// };

@Injectable({
  providedIn: 'root',
})
export class TokenResolver {
  constructor(private loginService: LoginService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('Called the resolver here', route);

    // Aici poți să adaugi logica pentru a verifica token-ul
    // și să returnezi un Observable<boolean> în funcție de rezultatul verificării.

    return this.loginService.checkToken();
  }
}
