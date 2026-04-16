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
import { ActivatedRoute, Router } from '@angular/router';
import { EventItem } from '../../shared/interfaces/event';
import { EventService } from '../../core/services/event';

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
  public router = inject(Router);
  private eventService = inject(EventService);

  isEdit = signal(false);
  eventId = signal<string | null>(null);

  imageUrl = '';
  formError = '';
  priceInvalid = false;

  form = this.fb.group({
    title: this.fb.nonNullable.control('', Validators.required),
    category: this.fb.nonNullable.control('', Validators.required),
    town: this.fb.nonNullable.control('', Validators.required),
    address: this.fb.nonNullable.control('', Validators.required),
    date: this.fb.nonNullable.control('', Validators.required),
    time: this.fb.nonNullable.control('', Validators.required),
    price: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),

    images: this.fb.array<FormControl<string>>([], {
      validators: [minImages(1)]
    })
  });

  get imagesArray(): FormArray<FormControl<string>> {
    return this.form.get('images') as FormArray<FormControl<string>>;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit.set(true);
      this.eventId.set(id);

      this.eventService.getOne(id).subscribe(ev => {
        let isoDate = ev.date;
        if (ev.date.includes('/')) {
          const [day, month, year] = ev.date.split('/');
          isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        this.form.patchValue({
          title: ev.title,
          category: ev.category,
          town: ev.town,
          address: ev.address,
          date: isoDate,
          time: ev.time ?? '',
          price: ev.price,
          description: ev.description
        });

        ev.images.forEach(img => {
          this.imagesArray.push(this.fb.nonNullable.control(img));
        });
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

  validatePrice() {
    const value = this.form.get('price')?.value?.trim() || '';

    const isNumber = /^\d+(\.\d+)?$/.test(value);
    const isFree = value.toLowerCase() === 'free';

    this.priceInvalid = !(isNumber || isFree);
  }

  save() {
    this.form.markAllAsTouched();

    this.validatePrice();

    if (this.form.invalid || this.priceInvalid) {
      this.formError = this.priceInvalid
        ? "Price must be a number or 'Free'"
        : "Please fill all required fields";
      return;
    }

    this.formError = '';

    const raw = this.form.getRawValue();

    const formattedDate = raw.date.split('-').reverse().join('/');

    const data = {
      ...raw,
      date: formattedDate,
      images: this.imagesArray.getRawValue()
    };

    if (this.isEdit()) {
      const id = this.eventId()!;
      this.eventService.update(id, data as EventItem).subscribe(() => {
        this.router.navigate(['/events', id]);
      });
    } else {
      this.eventService.create(data as EventItem).subscribe(created => {
        this.router.navigate(['/events', created._id]);
      });
    }
  }


}
