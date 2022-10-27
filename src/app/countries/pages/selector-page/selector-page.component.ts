import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountrySmall } from '../../interfaces/countries.interface';

interface MenuItem {
  text: string;
  route: string;
}

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit  {
 
  myFormSelector: FormGroup = this.fb.group({
    region : ['', Validators.required],
    country: ['', Validators.required]
  })

  // fill selectors
  regions: string[] = [];
  countries: CountrySmall[] = [];

  constructor( private fb: FormBuilder,
               private countriesService: CountriesService) { }
 
  ngOnInit(): void {

    this.regions = this.countriesService.regions;

    //when region changes
    this.myFormSelector.get('region')?.valueChanges
        .subscribe( region =>{
          // console.log(region);
          this.countriesService.getCountriesByRegion(region)
              .subscribe( countries => {
                this.countries = countries
                // console.log(countries);
                
              })
          
        })
      
  }

  save(){
    console.log(this.myFormSelector.value); 
    
  }


}
