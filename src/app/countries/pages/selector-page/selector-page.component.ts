import { Component  } from '@angular/core';

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
export class SelectorPageComponent  {

  selectorMenu: MenuItem[] = [
    {
    text: 'Selector',
    route: './countries/selector'
    } 
  ]

  constructor() { }
 



}
