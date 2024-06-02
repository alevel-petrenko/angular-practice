import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>

      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>

      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">Apply now</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-Name">First name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-Name">Last name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">

          <button type="submit" class="primary">Apply</button>

        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

    route: ActivatedRoute = inject(ActivatedRoute);
    housingService = inject(HousingService);
    housingLocation: HousingLocation | undefined;

    applyForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });

    constructor() {
      const housingLocationId = Number(this.route.snapshot.params['id']);
      this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    }
    
    submitApplication() {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
    }
}
