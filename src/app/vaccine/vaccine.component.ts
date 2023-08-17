import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VaccineserviceService } from '../shared/vaccineservice.service';
import { vaccineModel } from './vaccine.model';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent  implements OnInit{

  vaccineform!: FormGroup;
  vaccineModelObject: vaccineModel = new vaccineModel();
  vaccineData!: any;
  selecteddosage:string='';
  showadd!: boolean;
  showupdate!: boolean;
constructor(private formbuilder: FormBuilder,private vaccineservice:VaccineserviceService){}

  ngOnInit(): void {
    this.vaccineform = this.formbuilder.group({
      vaccine: [''],
      duration: [''],
      dosage: [''],
      radio: [''],
     
    })
    this.getvaccinedata();
  } 
  clickAddvaccinedata() {
    this.vaccineform.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  getvaccinedata() {
    this.vaccineservice.getvaccine()
      .subscribe(res => {
        this.vaccineData = res;
      })
  }
  postvaccinedata() {
    this.vaccineModelObject.vaccine = this.vaccineform.value.vaccine;
    this.vaccineModelObject.duration = this.vaccineform.value.duration;
    this.vaccineModelObject.dosage = this.vaccineform.value.dosage;
    this.vaccineModelObject.radio = this.vaccineform.value.radio;


    this.vaccineservice.postvaccine(this.vaccineModelObject)
      .subscribe(res => {
        console.log(res);
        alert("vaccine Added Succesfully");
        this.vaccineform.reset();
        this.getvaccinedata();
      })
  }
 
  deletevaccinedata(vaccine: any) {
    this.vaccineservice.deletevaccine(vaccine.id)
      .subscribe(res => {
        alert("Deleted");
        this.getvaccinedata();
      })
  }
  onEdit(vaccine: any) {
    this.showadd = false;
    this.showupdate = true;

    this.vaccineModelObject.id = vaccine.id;
    this.vaccineform.controls['vaccine'].setValue(vaccine.vaccine);
    this.vaccineform.controls['duration'].setValue(vaccine.duration);
    this.vaccineform.controls['dosage'].setValue(vaccine.dosage);
    this.vaccineform.controls['radio'].setValue(vaccine.radio);
    
  }
  updatevaccinedata() {
    this.vaccineModelObject.vaccine = this.vaccineform.value.vaccine;
    this.vaccineModelObject.duration = this.vaccineform.value.duration;
    this.vaccineModelObject.dosage = this.vaccineform.value.dosage;
    this.vaccineModelObject.radio = this.vaccineform.value.radio;

    this.vaccineservice.updatevaccine(this.vaccineModelObject, this.vaccineModelObject.id)
      .subscribe(res => {
        alert("Updated succesfully");
      })
    this.getvaccinedata();

  }
  OnChangeEvent(event:any){
    this.selecteddosage= event.target.value
    console.log(event.target.value);
 
   }

  }


