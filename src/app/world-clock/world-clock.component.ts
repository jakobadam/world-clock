import {
  ChangeDetectionStrategy,
  Component,
  Pipe,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  changeTimezone,
  formatTime,
  getSupportedTimezones,
  setTimezoneHours,
} from './timezone';
import { FormsModule } from '@angular/forms';
import { map, timer } from 'rxjs';

const SUPPORTED_TIMEZONES = getSupportedTimezones();

@Pipe({
  name: 'time',
  standalone: true,
  pure: true,
})
export class TimeFormatPipe {
  transform(date: Date): any {
    return formatTime(date);
  }
}

@Component({
  selector: 'app-world-clock',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeFormatPipe],
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorldClockComponent {
  now$ = timer(0, 1000).pipe(map(() => new Date()));

  supportedTimezones = SUPPORTED_TIMEZONES;
  filteredTimezones = this.supportedTimezones;
  selectedTimezone = '';

  browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  timezones: string[] = [
    'Europe/Copenhagen',
    'America/New_York',
    'Europe/London',
    'Europe/Istanbul',
    'UTC',
  ].filter((tz) => tz !== this.browserTz);

  hours = [...Array(24).keys()];
  selectedHour1 = 8;
  selectedHour2 = 22;

  filterTimezones(event: any) {
    const timezonePrefix = event.target.value;
    // Filter the options based on user input
    this.filteredTimezones = this.supportedTimezones.filter((timezone) =>
      timezone.toLowerCase().includes(timezonePrefix.toLowerCase()),
    );
  }

  addTimezone() {
    if (this.selectedTimezone) this.timezones.push(this.selectedTimezone);
    this.selectedTimezone = '';
  }

  getTimeInTimezone(date: Date, tz: string) {
    return changeTimezone(date, tz);
  }

  getTimeAtHoursInTimezone(date: Date, hours: number, timezone: string) {
    const d = new Date(date);
    d.setMinutes(0, 0, 0);
    return setTimezoneHours(d, hours, timezone);
  }

  getCity(tz: string) {
    const [continent, city] = tz.split('/');
    return city ? city.replace('_', ' ') : continent;
  }

  padHour(hour: number) {
    return hour < 10 ? '0' + hour : hour;
  }

  getTime(hour: number) {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return d;
  }
}
