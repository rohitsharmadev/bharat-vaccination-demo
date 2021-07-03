import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api-endpoints-constants';
import { environment } from '../../environments/environment';
import { ContentService } from './content.service';
import { IVaccinationCenterService } from '../IServices/IVaccinationCenter';
@Injectable({
  providedIn: 'root',
})
export class VaccinationCenterService implements IVaccinationCenterService {
  configObj: any = {};
  constructor(private contentService: ContentService) {
    this.configObj = environment;
  }

  searchForSlotsByPin(param): any {
    return this.contentService.getData(
      `${this.configObj.url}${API_ENDPOINTS.GET_SLOTS_BY_PIN}?pincode=${
        param.pin
      }&date=${this.getFormattedDateAndTime(param.date, true)}`
    );
  }

  searchForSlotsByDist(param): any {
    return this.contentService.getData(
      `${this.configObj.url}${API_ENDPOINTS.GET_SLOTS_BY_DIST}?district_id=${
        param.distId
      }&date=${this.getFormattedDateAndTime(param.date, true)}`
    );
  }

  /*
   * @method getStatesList()
   * @desc used to get state list .
   * @return json array data.
   */
  getStatesList(): any {
    return this.contentService.getData(
      this.configObj.url + API_ENDPOINTS.GET_STATES
    );
  }

  /*
   * @method getCityList()
   * @desc used to get city list .
   * @return json array data.
   */
  getCityList(stateId): any {
    return this.contentService.getData(
      `${this.configObj.url}${API_ENDPOINTS.GET_CITIES}${stateId}`
    );
  }

  getFormattedDateAndTime(date, isFlag = false): any {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return isFlag
      ? `${day}-${month}-${year}`
      : `${day} ${monthNames[month.replace(/^0+/, '') - 1]} ${year}`;
  }
}
