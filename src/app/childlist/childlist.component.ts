import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListModel } from './list.model';
import { ListserviceService } from '../shared/listservice.service';

@Component({
  selector: 'app-childlist',
  templateUrl: './childlist.component.html',
  styleUrls: ['./childlist.component.css']
})
export class ChildlistComponent implements OnInit {
  listValue!: FormGroup;
  listModelObject: ListModel = new ListModel();
  listData!: any;
  showadd!: boolean;
  showupdate!: boolean;

  constructor(private formbuilder: FormBuilder, private listservice: ListserviceService) { }
  ngOnInit(): void {
    this.listValue = this.formbuilder.group({
      name: [''],
      date: [''],
      mother: [''],
      father: [''],
      contact: [''],
      address:[''],
    })
    this.getdata();
  }

  clickAdddata() {
    this.listValue.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  postdata() {
    this.listModelObject.name = this.listValue.value.name;
    this.listModelObject.date = this.listValue.value.date;
    this.listModelObject.mother = this.listValue.value.mother;
    this.listModelObject.father = this.listValue.value.father;
    this.listModelObject.contact = this.listValue.value.contact;
    this.listModelObject.address = this.listValue.value.address;

    this.listservice.postlist(this.listModelObject)
      .subscribe(res => {
        console.log(res);
        alert("Child Added Succesfully");
        this.listValue.reset();
        this.getdata();
      })
  }

  getdata() {
    this.listservice.getlist()
      .subscribe(res => {
        this.listData = res;
      })
  }
  
  deletedata(list: any) {
    this.listservice.deletelist(list.id)
      .subscribe(res => {
        alert("Deleted");
        this.getdata();
      })
  }
  onEdit(list: any) {
    this.showadd = false;
    this.showupdate = true;

    this.listModelObject.id = list.id;
    this.listValue.controls['name'].setValue(list.name);
    this.listValue.controls['date'].setValue(list.date);
    this.listValue.controls['mother'].setValue(list.mother);
    this.listValue.controls['father'].setValue(list.father);
    this.listValue.controls['contact'].setValue(list.contact);
    this.listValue.controls['address'].setValue(list.address);
  }

  updatedata() {
    this.listModelObject.name = this.listValue.value.name;
    this.listModelObject.date = this.listValue.value.date;
    this.listModelObject.mother = this.listValue.value.mother;
    this.listModelObject.father = this.listValue.value.father;
    this.listModelObject.contact = this.listValue.value.contact;
    this.listModelObject.address = this.listValue.value.address;
    this.listservice.updatelist(this.listModelObject, this.listModelObject.id)
      .subscribe(res => {
        alert("Updated succesfully");
      })
    this.getdata();

  }

}



