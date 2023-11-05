import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sensor } from 'src/app/store/sensor/sensor.model';

@Component({
  selector: 'app-sensor-popup',
  templateUrl: './sensor-popup.component.html',
  styleUrls: ['./sensor-popup.component.scss']
})
export class SensorPopupComponent {

  @Input()
  sensor!: Sensor | null;
  @Input()
  isOpen: boolean = false;
  @Output()
  onCancel = new EventEmitter<void>();

  formGroup = this.buildForm();

  constructor(private formBuilder: FormBuilder) {}

  cancel() {
    this.onCancel.emit();
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

}
