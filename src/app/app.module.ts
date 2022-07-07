import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpClient } from '@angular/common/http'
import { HttpService } from './services/http.service';
import { MainComponent } from './components/main/main.component';
import { UploadComponent } from './components/upload/upload.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
