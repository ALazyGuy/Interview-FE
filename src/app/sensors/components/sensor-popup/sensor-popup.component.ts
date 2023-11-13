import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadPopupData } from 'src/app/store/sensor/sensor.actions';
import { Sensor } from 'src/app/store/sensor/sensor.model';
import { selectPopupData } from 'src/app/store/sensor/sensor.selectors';
import { SensorUpdateRequest } from '../../models/sensor-update-request';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sensor-popup',
  templateUrl: './sensor-popup.component.html',
  styleUrls: ['./sensor-popup.component.scss']
})
export class SensorPopupComponent implements OnInit, OnDestroy {

  private subscripsion!: Subscription;

  @Input()
  sensor$!: BehaviorSubject<Sensor>;
  @Input()
  isOpen: boolean = false;
  @Input()
  error$!: BehaviorSubject<string | null>;
  @Output()
  onSave = new EventEmitter<{ body: SensorUpdateRequest, id: number | null }>();
  @Output()
  onCancel = new EventEmitter<void>();

  popupData$ = this.store.select(selectPopupData);
  sensorId!: number;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadPopupData());
    this.formGroup = this.buildForm();
    this.subscripsion = this.sensor$.subscribe(this.patchSensorValue.bind(this));
  }

  ngOnDestroy(): void {
    this.subscripsion.unsubscribe();
  }

  cancel() {
    this.onCancel.emit();
  }

  save() {
    const body: SensorUpdateRequest = this.formGroup.value;
    this.onSave.emit({ body: body, id: this.sensorId });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      unit: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private patchSensorValue(sensor: Sensor) {
    this.formGroup.patchValue({
      name: sensor.name,
      model: sensor.model,
      type: sensor.type,
      from: sensor.from,
      to: sensor.to,
      unit: sensor.unit,
      location: sensor.location,
      description: sensor.description,
    });
    this.sensorId = sensor.id;
  }

}
