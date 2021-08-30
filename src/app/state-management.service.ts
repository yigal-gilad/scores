import { Injectable } from '@angular/core';
import { INITIAL_STATE } from "./constants/initial-state";
import { state } from "./interfaces/state-interface";
;

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  state: state;
  constructor() {
    this.state = INITIAL_STATE;
  }
}
