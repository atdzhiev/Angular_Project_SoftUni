import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Notifier } from './features/notifier/notifier';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,Notifier],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
