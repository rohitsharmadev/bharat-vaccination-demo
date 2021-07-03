import { SearchComponent } from './../common/search/search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationCenterRoutingModule } from './vaccination-center-routing.module';
import { VaccinationCenterService } from '../../services/vaccination-center.service';
import { ContentService } from '../../services/content.service';
import { VaccinationCenterDetailsComponent } from './vaccination-center-details/vaccination-center-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [VaccinationCenterDetailsComponent,SearchComponent],
  imports: [
    CommonModule,
    VaccinationCenterRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  providers: [
    ContentService,
    VaccinationCenterService,
    { provide: 'IVaccinationCenterService', useClass: VaccinationCenterService },
  ],
})
export class VaccinationCenterModule { }
