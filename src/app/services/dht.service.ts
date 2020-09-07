import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DHTService {

  temperature: Observable<number>;
  humidity: Observable<number>;
  heatIndex: Observable<number>;

  constructor(
    private database: AngularFireDatabase
  ) {
    this.temperature = database.object('dht/temperature').valueChanges() as Observable<number>;
    this.humidity = database.object('dht/humidity').valueChanges() as Observable<number>;
    this.heatIndex = database.object('dht/heatIndex').valueChanges() as Observable<number>;
  }
}
