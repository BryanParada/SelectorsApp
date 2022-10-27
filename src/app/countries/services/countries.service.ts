import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions]; //<------- se desestructura con [...] para generar una copia, asi podemos editar este objeto sin miedo a que se modifique _regions
  }

  constructor() { }
}
