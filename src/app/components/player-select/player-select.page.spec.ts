import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSelectPage } from './player-select.page';

describe('PlayerSelectPage', () => {
  let component: PlayerSelectPage;
  let fixture: ComponentFixture<PlayerSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
