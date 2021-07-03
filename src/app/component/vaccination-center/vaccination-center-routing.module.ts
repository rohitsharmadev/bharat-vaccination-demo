import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccinationCenterDetailsComponent } from '../vaccination-center/vaccination-center-details/vaccination-center-details.component';
const vaccinationRoute: Routes = [
  {
    path: '', redirectTo: 'vaccination-center',
  },
  {
    path: 'vaccination-center',
    component: VaccinationCenterDetailsComponent,
    data: { title: 'Vaccination Center' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(vaccinationRoute)],
  exports: [RouterModule]
})
export class VaccinationCenterRoutingModule { }
