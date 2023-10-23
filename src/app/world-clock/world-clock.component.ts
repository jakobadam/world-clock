import {Component, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import {changeTimezone, formatTime, getSupportedTimezones, setTimezoneHours} from "./timezone-helpers";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {map, timer} from "rxjs";

const SUPPORTED_TIMEZONES = getSupportedTimezones();

@Pipe({
  name: 'time',
  standalone: true,
  pure: true
})
export class TimeFormatPipe {

  transform(date: Date): any {
    return formatTime(date);
  }
}

@Component({
  selector: 'app-world-clock',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, FormsModule, TimeFormatPipe],
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css']
})
export class WorldClockComponent {
  now$ = timer(0, 1000).pipe(map(() => new Date()));

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

  getTimeInTimezone(date:Date, tz: string) {
    return changeTimezone(date, tz);
  }

  getTimeAtHoursInTimezone(date: Date, hours: number, timezone: string) {
    const d = new Date(date);
    d.setMinutes(0,0,0);
    return setTimezoneHours(d, hours, timezone);
  }

}
