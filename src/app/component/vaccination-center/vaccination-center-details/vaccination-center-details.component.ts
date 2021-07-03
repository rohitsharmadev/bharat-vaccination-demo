import { VaccinationCenterService } from './../../../services/vaccination-center.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { distinct } from 'rxjs/operators';
@Component({
  selector: 'app-vaccination-center-details',
  templateUrl: './vaccination-center-details.component.html',
  styleUrls: ['./vaccination-center-details.component.scss'],
})
export class VaccinationCenterDetailsComponent
  implements OnInit, AfterViewInit
{
  displayedColumns: any[] = [' '];
  dataSource = new MatTableDataSource<any>();
  isData: number = 0;
  api: any = { countrySelect: 'countrySelect' };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSecondTab: boolean = false;
  searchOptionsTab1 = [
    {
      key: 'propertyName',
      details: {
        type: 'text',
        generalDetails: { placeholder: 'Enter Your PIN' },
      },
    },
  ];
  searchOptionsTab2 = [
    {
      key: 'stateId',
      details: {
        type: 'stateSelect',
        generalDetails: { lable: 'State:' },
        DropdownDetails: [],
      },
    },
    {
      key: 'cityId',
      details: {
        type: 'citySelect',
        generalDetails: { lable: 'District:' },
        DropdownDetails: [],
      },
    },
  ];

  constructor(
    private _snackBar: MatSnackBar,
    private vaccinationCenterService: VaccinationCenterService
  ) {
    this.getColumns();
  }
  getColumns() {
    for (let i = 1; i <= 8; i++) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      this.displayedColumns.push(
        this.vaccinationCenterService.getFormattedDateAndTime(date)
      );
    }
  }
  ngOnInit() {
    this.openSnackBar();
  }
  openSnackBar(msg='Welcome to Bharat Vaccination Drive') {
    const config = { duration: 5000 };
    this._snackBar.open(
      msg,
      undefined,
      config
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getVaccinesList =(result) => {
    let vaccineDetails: any = [];
        for (let [i, vaccine] of result.centers.entries()) {
          vaccineDetails.push({
            center: vaccine,
            address: [
              { name: vaccine.name },
              {
                address: `${vaccine.address},${vaccine.district_name},${vaccine.state_name},${vaccine.pincode}`,
              },
            ],
          });
        }
        this.dataSource = new MatTableDataSource<any>(vaccineDetails);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator;
        this.isData = vaccineDetails.length ? vaccineDetails.length : 0;
  }
  getSlotListByDist(distId) {
    const obj = {
      distId: distId,
      date: new Date()
    };
    this.vaccinationCenterService
      .searchForSlotsByDist(obj)
      .subscribe((result) => {
        result.centers &&  result.centers.length ? this.getVaccinesList(result) : this.openSnackBar("No Records, please try with other options");
      });
  }
  getSlotListByPin(pin) {
    const obj = {
      pin: pin,
      date: new Date()
    };
    this.vaccinationCenterService
      .searchForSlotsByPin(obj)
      .subscribe((result) => {
        result.centers && result.centers.length ? this.getVaccinesList(result) : this.openSnackBar("No Records");
      });
  }
  getSlotsList(finalSearch) {
    if (this.isSecondTab && finalSearch.cityId) {
      this.getSlotListByDist(finalSearch.cityId);
    } else {
      this.getSlotListByPin(finalSearch.propertyName);
    }
  }
  /**
   * @method searchDetails()
   * @desc Used to search details.
   * @param inputVal :  string - key on which data is searched.
   */
  searchDetails(inputVal): void {
    const finalSearch = inputVal;
    let flag = false;
    for (const key in finalSearch) {
      if (finalSearch[key]) {
        flag = true;
      }
    }
    flag && this.getSlotsList(finalSearch);
  }

  onTabChanged(event) {
    if (event.index === 1) {
      this.isSecondTab = true;
    } else if (event.index === 0) {
    }
  }
}
