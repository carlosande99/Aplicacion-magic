import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaAvanzadaComponent } from './busqueda-avanzada.component';

describe('BusquedaAvanzadaComponent', () => {
  let component: BusquedaAvanzadaComponent;
  let fixture: ComponentFixture<BusquedaAvanzadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaAvanzadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaAvanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
