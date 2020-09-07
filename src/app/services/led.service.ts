import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LedService {

  red: Observable<boolean>;
  green: Observable<boolean>;
  blue: Observable<boolean>;

  constructor(
    private database: AngularFireDatabase
  ) {
    this.red = database.object('led/r').valueChanges() as Observable<boolean>;
    this.green = database.object('led/g').valueChanges() as Observable<boolean>;
    this.blue = database.object('led/b').valueChanges() as Observable<boolean>;
  }

  setAll(status: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.object(`led`).set({ r: status, g: status, b: status }).then(() => {
        console.log('All leds updated', status);
        resolve();
      }).catch(err => {
        console.error('Error updating all leds', status, err);
        reject(err);
      });
    });
  }

  updateLedStatus(led: string, status: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.object(`led/${led}`).set(status).then(() => {
        console.log('Led updated', led, status);
        resolve();
      }).catch(err => {
        console.error('Error updating led', led, status, err);
        reject(err);
      });
    });
  }

}
