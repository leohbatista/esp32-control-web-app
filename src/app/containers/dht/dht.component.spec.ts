import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DHTComponent } from './dht.component';

describe('DhtComponent', () => {
  let component: DHTComponent;
  let fixture: ComponentFixture<DHTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DHTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DHTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
