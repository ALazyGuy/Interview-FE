import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsPageComponent } from './sensors-page.component';

describe('SensorsPageComponent', () => {
  let component: SensorsPageComponent;
  let fixture: ComponentFixture<SensorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
