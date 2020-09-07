import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LedService } from './../../services/led.service';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit, OnDestroy {

  isLoading = true;
  loadingStatus = [true, true, true];

  red: boolean;
  green: boolean;
  blue: boolean;

  rSubscription: Subscription;
  gSubscription: Subscription;
  bSubscription: Subscription;


  constructor(
    private led: LedService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.rSubscription = this.led.red.subscribe(value => {
      this.red = value;
      this.updateLoadingStatus(0, false);
    });

    this.gSubscription = this.led.green.subscribe(value => {
      this.green = value;
      this.updateLoadingStatus(1, false);
    });

    this.bSubscription = this.led.blue.subscribe(value => {
      this.blue = value;
      this.updateLoadingStatus(2, false);
    });
  }

  ngOnDestroy(): void {
    if (this.rSubscription) { this.rSubscription.unsubscribe(); }
    if (this.gSubscription) { this.gSubscription.unsubscribe(); }
    if (this.bSubscription) { this.bSubscription.unsubscribe(); }
  }

  getCurrentColor(): string {
    return '#' + (this.red ? 'FF' : '00') + (this.green ? 'FF' : '00') + (this.blue ? 'FF' : '00') + (this.isOn ? 'FF' : 'AA');
  }

  isOn(): boolean {
    return this.red || this.green || this.blue;
  }

  toggleColor(event: MatSlideToggleChange): void {
    this.led.updateLedStatus(event.source.name, event.checked).then(() => {
      this.snackbar.open('Status atualizado', null, { duration: 1000 });
    }).catch(err => {
      this.snackbar.open(`Erro ao atualizar status`, null, { duration: 1200 });
    });
  }

  toggleLed(event: MatSlideToggleChange): void {
    this.led.setAll(event.checked).then(() => {
      this.snackbar.open(event.checked ? 'Ligado' : 'Desligado', null, { duration: 1000 });
    }).catch(err => {
      this.snackbar.open(`Erro ao ${event.checked ? 'ligar' : 'desligar'}`, null, { duration: 1000 });
    });
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
