import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
 
  myFormSelector: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })

  constructor( private fb: FormBuilder) { }
 
  save(){
    console.log(this.myFormSelector.value);
    
  }


}
