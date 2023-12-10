import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeatherInfo } from 'src/app/models/weatherForm.model';
import { WeatherDataService } from 'src/app/services/weather-data/weather-data.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherInfoComponent {
  public weatherForm: FormGroup = new FormGroup({});
  public formErrors: any
  public errorMsg = '';
  public apiErrorMsg = ''
  public isError: boolean = false
  public isApiError: boolean = false
  public isSubmit = false
  public showLoading: boolean = false;
  public weatherInfo: WeatherInfo | undefined;
  public temp_max: number | undefined; 
  public temp_min: number | undefined;

  public constructor(private formBuilder: FormBuilder, public weatherService: WeatherDataService) {
    this.weatherForm = this.formBuilder.group({
      cityName: ['', Validators.required]
    })
    /**Form errors */
    this.formErrors = {
      cityName: ['']
    }
  }
  public toggleDarkMode(event: Event): void {
    const target = (event.target as HTMLInputElement | null)?.checked ?? false;
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('dark-mode', target);
    }
  }

  public async onSubmit() {
    this.isSubmit = true
    if (!this.weatherForm.valid) {

      this.isError = true;
      this.isApiError = false
      this.errorMsg = 'Please enter a city.';
    } else {
      this.isError = false;
      this.isApiError = false
      const cityName = this.weatherForm.controls['cityName'].value;
      this.showLoading = true; // Show the loading spinner
      try {
        this.weatherInfo = await this.weatherService.getWeather(cityName);
        if (!this.weatherInfo) {

          this.isError = true;
          this.isApiError = false;
          this.errorMsg = 'Enter correct city name';
        } else {
          this.isError = false;
          this.errorMsg = ''
          this.temp_max = parseFloat((this.weatherInfo.main['temp_max'] - 273.15).toFixed(2));
          this.temp_min = parseFloat((this.weatherInfo.main['temp_min'] -273.15).toFixed(2));
        }
      } catch (error) {
        this.isApiError = true;
        this.isError = false;
        this.apiErrorMsg = 'Error fetching weather information. Please try again.';
      } finally {
        this.showLoading = false; // Hide the loading spinner when done
      }
    }
  }
}
