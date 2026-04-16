import { Component,inject } from '@angular/core';
import { NotifierService } from '../../core/services/notifier';

@Component({
  selector: 'app-notifier',
  imports: [],
  templateUrl: './notifier.html',
  styleUrl: './notifier.css',
})
export class Notifier {
  notifier = inject(NotifierService);
}
