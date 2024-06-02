import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    CommonModule,
    HousingLocationComponent ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
  </section>
`,
  styleUrl: './home.component.css'
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  filterResults(filterValue: string) {
      if (!filterValue) {
        this.filteredLocationList = this.housingLocationList;
        return;
      }

      filterValue = filterValue.toLowerCase();

      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(filterValue)
                        || housingLocation?.name.toLowerCase().includes(filterValue)
      );
  }

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }
}
