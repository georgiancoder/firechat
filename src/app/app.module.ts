import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistationComponent } from './registation/registation.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app.routing.module';
import {SharedContainersModule} from './shared-containers/shared-containers.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {MessengerComponent} from './messenger/messenger.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {MessagesComponent} from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistationComponent,
    LoginComponent,
    VerifyEmailComponent,
    MessengerComponent,
    FriendListComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    SharedContainersModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
