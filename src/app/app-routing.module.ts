import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedComponent } from './containers/led/led.component';
import { DHTComponent } from './containers/dht/dht.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'led' },
  { path: 'led', component: LedComponent },
  { path: 'dht', component: DHTComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
