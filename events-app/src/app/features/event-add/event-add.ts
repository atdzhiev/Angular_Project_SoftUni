import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


function minImages(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;
    return array.length >= min ? null : { minImages: true };
  };
}

@Component({
  selector: 'app-event-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './event-add.html',
  styleUrl: './event-add.css',
})
export class EventAdd {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  isEdit = signal(false);

  imageUrl = '';

  form = this.fb.group({
    title: this.fb.nonNullable.control('', Validators.required),
    category: this.fb.nonNullable.control('', Validators.required),
    town: this.fb.nonNullable.control('', Validators.required),
    address: this.fb.nonNullable.control('', Validators.required),
    date: this.fb.nonNullable.control('', Validators.required),
    price: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
    images: this.fb.array<FormControl<string>>([], {
      validators: [minImages(1)]
    })
  });

  get imagesArray(): FormArray<FormControl<string>> {
    return this.form.get('images') as FormArray<FormControl<string>>;
  }

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit.set(true);

      const mockEvent = {
        title: 'Rock Concert',
        category: 'Music',
        town: 'Sofia',
        address: 'Arena Armeec',
        date: '2026-05-12 20:00',
        price: '25 BGN',
        description: 'A great rock concert with top bands performing live.',
        images: [
          'assets/images/event1.jpg',
          'assets/images/event1b.jpg'
        ]
      };

      this.form.patchValue({
        title: mockEvent.title,
        category: mockEvent.category,
        town: mockEvent.town,
        address: mockEvent.address,
        date: mockEvent.date,
        price: mockEvent.price,
        description: mockEvent.description
      });

      mockEvent.images.forEach(img => {
        this.imagesArray.push(this.fb.nonNullable.control(img));
      });
    }
  }

  addImage() {
    const url = this.imageUrl.trim();
    if (!url) return;

    this.imagesArray.push(this.fb.nonNullable.control(url));
    this.imageUrl = '';
  }

  removeImage(index: number) {
    this.imagesArray.removeAt(index);
  }

  setMainImage(index: number) {
    const control = this.imagesArray.at(index);
    this.imagesArray.removeAt(index);
    this.imagesArray.insert(0, control);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }

    const formValue = {
      ...this.form.getRawValue(),
      images: this.imagesArray.getRawValue()
    };

    console.log('Form submitted:', formValue);
    alert('Event saved (mock)');
  }
}