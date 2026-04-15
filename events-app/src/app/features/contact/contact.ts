import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name = '';
  email = '';
  message = '';

  showModal = signal(false);

  submitForm(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.showModal.set(true);

    this.name = '';
    this.email = '';
    this.message = '';

    form.resetForm();
  }


  closeModal() {
    this.showModal.set(false);
  }
}

