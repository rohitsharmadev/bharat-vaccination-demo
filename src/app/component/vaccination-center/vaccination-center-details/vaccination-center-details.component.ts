import { VaccinationCenterService } from './../../../services/vaccination-center.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-vaccination-center-details',
  templateUrl: './vaccination-center-details.component.html',
  styleUrls: ['./vaccination-center-details.component.scss'],
})
export class VaccinationCenterDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  vaccinesByDist: Subscription;
  vaccinesByPin: Subscription;
  tableData:any =[];
  filters:any =[];
  displayedColumns: any[] = [' '];
  dataSource = new MatTableDataSource<any>();
  isData: number = 0;
  isSearchCalled = false;
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
  openSnackBar(msg = 'Welcome to Bharat Vaccination Drive') {
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

  getVaccinesList = (result) => {
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
    this.isSearchCalled =true;
    this.vaccinesByDist =this.vaccinationCenterService
      .searchForSlotsByDist(obj)
      .subscribe((result) => {
        this.tableData =[];
        this.tableData =result.centers;
        result.centers && result.centers.length ? this.getVaccinesList(result) : this.openSnackBar("No Records, please try with other options");
      });
  }
  getSlotListByPin(pin) {
    const obj = {
      pin: pin,
      date: new Date()
    };
    this.isSearchCalled =true;
    this.vaccinesByPin= this.vaccinationCenterService
      .searchForSlotsByPin(obj)
      .subscribe((result) => {
        this.tableData =[];
        this.tableData =result.centers;
        result.centers && result.centers.length ? this.getVaccinesList(result) : this.openSnackBar("No Records, please try with other options");
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
  applyFilter(event, key) {
    console.log(event.target.checked);
    if(event.target.checked) {
      this.filters.push(key)
    } else {
      const index = this.filters.indexOf(key);
if (index > -1) {
  this.filters.splice(index, 1);
}

    }

    
    console.log(this.filters);
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    //this.dataSource.filter = 'Krishna';
     const filterData = this.tableData.filter((elem) => {
       console.log(elem.fee_type === 'Free')
       return elem.fee_type === 'Free' ? elem : null;
     });
     console.log(filterData);
     this.getVaccinesList({centers: filterData});
    //  this.dataSource = new MatTableDataSource<any>(filterData);
    //  this.dataSource._updateChangeSubscription();
    //  this.dataSource.paginator = this.paginator;
  }

  onTabChanged(event) {
    if (event.index === 1) {
      this.isSecondTab = true;
    } else if (event.index === 0) {
    }
  }
  ngOnDestroy() {
    this.isSearchCalled = false;
    if(this.vaccinesByDist) {
      this.vaccinesByDist.unsubscribe();
    }
    if(this.vaccinesByPin) {
      this.vaccinesByPin.unsubscribe();
    }
  }
}
