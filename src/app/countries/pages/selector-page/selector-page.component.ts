import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountrySmall } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';

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
    country: ['', Validators.required],
    borders: ['', Validators.required]
  })

  // fill selectors
  regions: string[] = [];
  countries: CountrySmall[] = [];

  constructor( private fb: FormBuilder,
               private countriesService: CountriesService) { }
 
  ngOnInit(): void {

    this.regions = this.countriesService.regions;


    // -*-*-*-*-*-*-*-* OPCION 1 -*-*-*-*-*-*-*-*
    // //when region changes
    // this.myFormSelector.get('region')?.valueChanges
    //     .subscribe( region =>{
    //       // console.log(region);
    //       this.countriesService.getCountriesByRegion(region)
    //           .subscribe( countries => {
    //             this.countries = countries
    //             // console.log(countries); 
    //           }) 
    //     })

    // -*-*-*-*-*-*-*-* OPCION 2 -*-*-*-*-*-*-*-*
    // comentar zona de pipe para ver el efecto en el console.log *1
    // cambiar a tap(region) para obtener valor de region antes de que cambie a countries en el subscribe (opcional)
    this.myFormSelector.get('region')?.valueChanges
        .pipe(//                                  ^ 
          tap( ( _ )  =>{//                       b
            this.myFormSelector.get('country')?.reset('');
          }),//                                   P 
          //obtiene valor producto del observable ^
          //         |    ---------------------------------------------------
          //         |   |                                                 V  
          switchMap( region => this.countriesService.getCountriesByRegion(region) )  //esto regresará un nuevo observable v
 
          
        )
        .subscribe( countries =>{
          //console.log(countries); //*1
          this.countries = countries;
        })

        //Cuando cambia el pais
     this.myFormSelector.get('country')?.valueChanges
         .subscribe( country => {
          console.log(country);
          
         })

      
  }

  save(){
    console.log(this.myFormSelector.value); 
    
  }


}
