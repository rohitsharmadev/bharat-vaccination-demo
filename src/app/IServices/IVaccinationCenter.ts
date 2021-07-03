import { Observable } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export interface IVaccinationCenterService {
    searchForSlotsByPin(data): Observable<any>;
    searchForSlotsByDist(data): Observable<any>;
    getStatesList(): Observable<any>;
    getCityList(data): Observable<any>;
}
