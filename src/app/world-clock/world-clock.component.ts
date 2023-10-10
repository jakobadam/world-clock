import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {timezone} from "./timezone-helpers";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

const SUPPORTED_TIMEZONES = timezone.getSupportedTimezones();

@Component({
  selector: 'app-world-clock',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, FormsModule],
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css']
})
export class WorldClockComponent {
  now = new Date();

  supportedTimezones = SUPPORTED_TIMEZONES;
  filteredTimezones = this.supportedTimezones;
  selectedTimezone?: string;
  timezones:string[] = [
    'Europe/Copenhagen',
    'Europe/London',
    'Europe/Istanbul',
    'America/New_York'
  ];

  filterTimezones(event: any) {
    const timezonePrefix = event.target.value;
    // Filter the options based on user input
    this.filteredTimezones = this.supportedTimezones.filter(timezone =>
      timezone.toLowerCase().includes(timezonePrefix.toLowerCase())
    );
  }

  addTimezone(timezone: string) {
    this.timezones.push(timezone);
  }

  getTimeInTimezone(tz: string) {
    return timezone.changeTimezone(this.now, tz);
  }

  formatTime(date: Date) {
    // '2023-10-10T12:04:29.320Z'
    return date.toISOString().slice(11, 16)
  }

}
