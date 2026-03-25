import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaAvanzadaModalComponent } from './busqueda-avanzada-modal.component';

describe('BusquedaAvanzadaComponent', () => {
  let component: BusquedaAvanzadaModalComponent;
  let fixture: ComponentFixture<BusquedaAvanzadaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaAvanzadaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaAvanzadaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
