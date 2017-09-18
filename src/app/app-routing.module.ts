import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGaurdService} from './servers/edit-server/can-deactivate.gaurd.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolverService} from './servers/server/server-resolver.service';


const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent, children: [
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolverService}},
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGaurdService]}
  ]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found !'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute, {useHash : true})
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
