import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeoLocation, WeatherInfo } from 'src/app/models/weatherForm.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) { }

  public async getWeather(cityName: string): Promise<WeatherInfo> {
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=add your token`;
      const weatherData = await this.http.get<GeoLocation[]>(geoUrl).toPromise();

      if (weatherData && weatherData.length > 0) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0]?.lat}&lon=${weatherData[0]?.lon}&appid=add your token`;
        const weatherInfo = await this.http.get<WeatherInfo>(weatherUrl).toPromise();

        if (weatherInfo) {
          return weatherInfo;
        } else {
          throw new Error('Weather data not available');
        }
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
