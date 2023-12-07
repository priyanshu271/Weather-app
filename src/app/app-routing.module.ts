import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';

const routes: Routes = [
  {path:'weather',component:WeatherInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
