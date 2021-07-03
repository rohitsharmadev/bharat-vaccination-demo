import { PageNotFoundComponent } from './component/common/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/vaccination-center/vaccination-center.module').then(m => m.VaccinationCenterModule),
    data: { title: 'Vaccination Centers' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Vaccination Centers' }
  }
];
