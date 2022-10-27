import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country, CountrySmall } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _baseUrl: string = 'https://restcountries.com/v2'

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions]; //<------- se desestructura con [...] para generar una copia, asi podemos editar este objeto sin miedo a que se modifique _regions
  }

  constructor( private http: HttpClient) { }

  getCountriesByRegion ( region: string) : Observable<CountrySmall[]>{
    //se utiliza CountrySmall[] ya que se puede acceder a mas de un campo, ej: country.name, country.alpha3Code 
    const url: string = `${ this._baseUrl}/region/${ region }?fields=alpha3Code,name`

    return this.http.get<CountrySmall[]>( url );

  }

  getCountryByCode (code: string): Observable<Country | null>{
    //se utiliza Country solamente puesto que solo entregara un campo

    if (!code) {
      //return {} // <--- objeto literal / objeto en blanco, no es un observable ni <Country></Country>
      return of(null)   // <--- of permite entregar un nuevo observable
    }

    const url = `${this._baseUrl}/alpha/${ code }`
    return this.http.get<Country>(url);
  }

  getCountryByCodeSmall (code: string): Observable<CountrySmall>{ 
 
    const url = `${this._baseUrl}/alpha/${ code }?fields=alpha3Code,name`
    return this.http.get<CountrySmall>(url);
  }

  getCountriesByCodes( borders: string[] ): Observable<CountrySmall[]>{
    if (!borders){//                                               ^
      return of([]);//---------------------------------------------|
    }

    const requests: Observable<CountrySmall>[] = [];

    borders.forEach( code => {
      const requ = this.getCountryByCodeSmall(code)
      requests.push( requ ); 
      
    }) 
    
    return combineLatest( requests ); //combineLatest regresa un Observable, que contiene un arreglo con todas las peticiones internas

  }
}
