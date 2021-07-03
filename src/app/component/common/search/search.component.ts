import { Component, Inject, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVaccinationCenterService } from '../../../IServices/IVaccinationCenter';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  employeeRole: any;
  @Input()
  searchOptions: any;
  @Input()
  customSearchValues: any;
  @Input() activateApis: any;
  @Output() searchEvent = new EventEmitter<object>();
  searchData: any;
  departmentData;
  allCities;
  allStates;
  /** MultiSelect initialization */
  /** control for the MatSelect filter keyword multi-selection */
  itemMultiFilterCtrlForState: FormControl = new FormControl();
  itemMultiFilterCtrlForCity: FormControl = new FormControl();

  /** list of items filtered by search keyword for multi-selection */
  filteredItemsMultiForState = new ReplaySubject();
  filteredItemsMultiForCity = new ReplaySubject();
  private _onDestroy = new Subject<void>();
  param = {
    page: 1,
    searchData: {},
    size: 0
  };
  constructor( @Inject('IVaccinationCenterService') private vaccinationCenterService: IVaccinationCenterService
  ) { }

  ngOnInit(): void {
    this.searchData = [];
    this.searchOptions.forEach(element => {
      // this.searchData[i++] = '';
    });
    if (this.searchOptions[1] && this.searchOptions[1].details &&
      this.searchOptions[1].details['preSelected']) {
      this.searchData[1] = this.searchOptions[1].details['preSelected'];
    }
    if (this.activateApis) {
      if (this.activateApis.countrySelect === 'countrySelect') {
        this.getStates();
      }
    }


    this.searchData = [];
    let i = 0;
    this.searchOptions.forEach(element => {
      this.searchData[i++] = '';
    });
    if (this.searchOptions[1] && this.searchOptions[1].details &&
      this.searchOptions[1].details['preSelected']) {
      this.searchData[1] = this.searchOptions[1].details['preSelected'];
    }
    if (this.searchOptions[0] && this.searchOptions[0].details &&
      this.searchOptions[0].details['preSelected']) {
      this.searchData[0] = Number(this.searchOptions[0].details['preSelected']);
      // this.getPropId(this.searchData[0]);
    }
  }

  /**
   * @description method to get search details and give as output.
   */
  searchDetail(): void {
    const searchInput = {};
    let i = 0;
    this.searchOptions.forEach(element => {
      searchInput[element.key] = (this.searchData[i]) ? this.searchData[i] : '';
      i++;
    });
    this.searchEvent.next(searchInput);
  }

  /**
   * @description method to reset search details and give as output.
   */
  resetDetail(): void {
    const searchInput = {};
    this.searchData = [];
    let i = 0;
    this.searchOptions.forEach(element => {
      searchInput[element.key] = '';
      this.searchData[i++] = '';
      this.searchEvent.next(searchInput);
    });
    this.searchDetail();
  }

  trackByFn(): any {
    return null;
  }

  /**
   * @method filterItemsMultiForCity()
   * @desc filter city list.
   * @returns list of items filtered by search keyword for multi-selection.
   */
  filterItemsMultiForCity(): any {
    if (!this.allCities) {
      return;
    }
    // get the search keyword
    let search = this.itemMultiFilterCtrlForCity.value;
    if (!search) {
      this.filteredItemsMultiForCity.next(this.allCities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredItemsMultiForCity.next(
      this.allCities.filter(item =>
        item.commonDesc2.toLowerCase().indexOf(search) > -1)
    );
  }
    /**
   * @method changeState()
   * @param e: getting value
   * @desc to get All commonid1.
   */
     changeState(e): void {
      let id = e;
      if (id) {
        this.getCites(id);
      }
    }
  /**
   * @method getStates()
   * @desc to get All states.
   */
  getStates(): any {
    this.vaccinationCenterService.getStatesList().
      subscribe(
      resp => {
        this.allStates = resp.states;
      });
  }

  /**
 * @method getCites()
 * @desc to get All cities.
 */
  getCites(distId): any {
    this.vaccinationCenterService.getCityList(distId).
      subscribe(
      resp => {
        this.allCities = resp.districts;
      });
  }

}
