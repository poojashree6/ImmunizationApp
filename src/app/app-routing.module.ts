import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChildlistComponent } from './childlist/childlist.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { ChildvaccineComponent } from './childvaccine/childvaccine.component';


const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'childlist',component:ChildlistComponent},
  {path:'vaccine',component:VaccineComponent},
  {path:'childvaccine',component:ChildvaccineComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
