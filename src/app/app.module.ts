import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';

import { AuthService } from './services/auth.service';

import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GooglePlaceModule,
    RouterModule.forRoot([
      { path: '', component: FormComponent },
      { path: 'success', component: SuccessComponent }
  ])],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
