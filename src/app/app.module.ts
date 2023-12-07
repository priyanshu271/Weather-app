import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule }  
    from '@angular/material/card'; 
    import { HttpClientModule } from '@angular/common/http';
    

@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
