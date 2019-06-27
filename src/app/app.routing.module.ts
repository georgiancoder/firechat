import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SimpleLayoutComponent} from './shared-containers/simple-layout/simple-layout.component';
import {RegistationComponent} from './registation/registation.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {MainLayoutComponent} from './shared-containers/main-layout/main-layout.component';
import {MessengerComponent} from './messenger/messenger.component';
import {SecureInnerPagesGuard} from './services/secure-inner-pages.guard';
import {AuthGuard} from './services/auth.guard';

const routes: Route[] = [
  {path: '', redirectTo: 'pages/login', pathMatch: 'full'},
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    canActivate: [SecureInnerPagesGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistationComponent},
      {path: 'verify-email', component: VerifyEmailComponent}
    ]
  },
  {
    path: 'messenger',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: MessengerComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
