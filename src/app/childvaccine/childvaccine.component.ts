import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListserviceService } from '../shared/listservice.service';
import { ListModel } from '../childlist/list.model';
import { vaccineModel } from '../vaccine/vaccine.model';
import { childModel } from './child.model';
import { ChildvaccineserviceService } from '../shared/childvaccineservice.service';
import { VaccineserviceService } from '../shared/vaccineservice.service';

@Component({
  selector: 'app-childvaccine',
  templateUrl: './childvaccine.component.html',
  styleUrls: ['./childvaccine.component.css']
})
export class ChildvaccineComponent implements OnInit {
  listData!: ListModel[];
  vaccineData!: vaccineModel[];

  childform!: FormGroup;
  childModelObject: childModel = new childModel();
  childData!: any;
  showadd!: boolean;
  showupdate!: boolean;

  constructor(private formbuilder: FormBuilder, private listservice: ListserviceService, private childvaccineservice: ChildvaccineserviceService, private vaccineservice: VaccineserviceService) { }
  ngOnInit(): void {
    this.childform = this.formbuilder.group({
      name: [''],
      vaccine: [''],
      given: [''],
      duedate: [''],
      givendate: [''],
      comment: [''],
    })
    this.getvaccinedata();
    this.getdata();
    this.getchilddata();

  }

  getdata() {
    this.listservice.getlist()
      .subscribe(res => {
        this.listData = res;
      })
  }

  getvaccinedata() {
    this.vaccineservice.getvaccine()
      .subscribe(res => {
        this.vaccineData = res;
      })
  }

  getchilddata() {
    this.childvaccineservice.getchild()
      .subscribe(res => {
        this.childData = res;
      })
  }

  clickAddchilddata() {
    this.childform.reset();
    this.showadd = true;
    this.showupdate = false;
  }
  postchilddata() {
    this.childModelObject.name = this.childform.value.name;
    this.childModelObject.vaccine = this.childform.value.vaccine;
    this.childModelObject.given = this.childform.value.given;
    this.childModelObject.duedate = this.childform.value.duedate;
    this.childModelObject.givendate = this.childform.value.givendate;
    this.childModelObject.comment = this.childform.value.comment;

    this.childvaccineservice.postchild(this.childModelObject)
      .subscribe(res => {
        console.log(res);
        alert("Child Added Succesfully");
        this.childform.reset();
        this.getchilddata();
      })
  }

  deletechilddata(child: any) {
    this.childvaccineservice.deletechild(child.id)
      .subscribe(res => {
        alert("Deleted");
        this.getchilddata();
      })
  }
  onEdit(child: any) {
    this.showadd = false;
    this.showupdate = true;

    this.childModelObject.id = child.id;
    this.childform.controls['name'].setValue(child.name);
    this.childform.controls['vaccine'].setValue(child.vaccine);
    this.childform.controls['given'].setValue(child.given);
    this.childform.controls['duedate'].setValue(child.duedate);
    this.childform.controls['givendate'].setValue(child.givendate);
    this.childform.controls['comment'].setValue(child.comment);
  }
  updatechilddata() {
    this.childModelObject.name = this.childform.value.name;
    this.childModelObject.vaccine = this.childform.value.vaccine;
    this.childModelObject.given = this.childform.value.given;
    this.childModelObject.duedate = this.childform.value.duedate;
    this.childModelObject.givendate = this.childform.value.givendate;
    this.childModelObject.comment = this.childform.value.comment;
    this.childvaccineservice.updatechild(this.childModelObject, this.childModelObject.id)
      .subscribe(res => {
        alert("Updated succesfully");
      })
    this.getchilddata();

  }


}
