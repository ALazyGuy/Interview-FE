import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  error$!: BehaviorSubject<string[]>;
  @Output()
  onSave = new EventEmitter<{ body: SensorUpdateRequest, id: number }>();
  @Output()
  onCancel = new EventEmitter<void>();

  @ViewChild('content')
  contentElement!: ElementRef;

  popupData$ = this.store.select(selectPopupData);
  sensorId!: number;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  @HostListener('document:mousedown', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickedInside = this.contentElement.nativeElement.contains(target);
    if (!clickedInside) {
      this.cancel();
    }
  }

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
    this.formGroup.markAsUntouched();
  }

  save() {
    if(this.formGroup.invalid) {
      const errors = [];      
      const controls = this.formGroup.controls;

      if(this.formGroup.errors?.['invalidRange']) {
        errors.push('"From" value cannot be more than "to"');
      }

      if(this.formGroup.errors?.['isNotInteger']) {
        errors.push('Range values have to be integers');
      }

      Object.keys(controls).forEach(key => controls[key].markAsTouched());
      this.error$.next(errors);
      return;
    }

    const body: SensorUpdateRequest = this.formGroup.value;
    this.onSave.emit({ body: body, id: this.sensorId });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      model: ['', [Validators.required, Validators.maxLength(15)]],
      type: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      unit: ['', Validators.required],
      location: ['', Validators.maxLength(40)],
      description: ['', Validators.maxLength(200)],
    }, {validators: this.validateRange});
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
  
  private validateRange(control: AbstractControl): ValidationErrors | null {
    const fromValue = control.get('from')?.value;
    const toValue = control.get('to')?.value;

    const isNotInteger = fromValue === '' || toValue === '' || !Number.isInteger(fromValue) || !Number.isInteger(toValue);
    const invalidRange = fromValue > toValue;

    return !isNotInteger && !invalidRange ? null : {isNotInteger: isNotInteger, invalidRange: invalidRange};
  }

}
