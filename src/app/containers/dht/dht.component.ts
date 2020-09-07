import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DHTService } from './../../services/dht.service';

@Component({
  selector: 'app-dht',
  templateUrl: './dht.component.html',
  styleUrls: ['./dht.component.scss']
})
export class DHTComponent implements OnInit, OnDestroy {

  temperature: number;
  humidity: number;
  heatIndex: number;

  temperatureSubscription: Subscription;
  humiditySubscription: Subscription;
  heatIndexSubscription: Subscription;

  lastTemperatureUpdate: Date;
  lastHumidityUpdate: Date;
  lastHeatIndexUpdate: Date;

  isLoading = true;
  loadingStatus = [true, true, true];

  constructor(
    private dht: DHTService,
  ) { }

  ngOnInit(): void {
    this.temperatureSubscription = this.dht.temperature.subscribe(value => {
      this.temperature = value;
      this.lastTemperatureUpdate = new Date();
      this.updateLoadingStatus(0, false);
    });

    this.humiditySubscription = this.dht.humidity.subscribe(value => {
      this.humidity = value;
      this.lastHumidityUpdate = new Date();
      this.updateLoadingStatus(1, false);
    });

    this.heatIndexSubscription = this.dht.heatIndex.subscribe(value => {
      this.heatIndex = value;
      this.lastHeatIndexUpdate = new Date();
      this.updateLoadingStatus(2, false);
    });
  }

  ngOnDestroy(): void {
    if (this.temperatureSubscription) { this.temperatureSubscription.unsubscribe(); }
    if (this.humiditySubscription) { this.humiditySubscription.unsubscribe(); }
    if (this.heatIndexSubscription) { this.heatIndexSubscription.unsubscribe(); }
  }

  updateLoadingStatus(index: number, value: boolean): void {
    this.loadingStatus[index] = value;

    if (this.loadingStatus.indexOf(true) >= 0) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }
}
