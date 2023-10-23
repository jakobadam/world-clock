export function getSupportedTimezones(): string[] {
    return (Intl as any).supportedValuesOf('timeZone');
}

const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;

/**
 * Change timezone of the given date.
 *
 * The en-US formatted date string, as input for `Date()` seems to work well.
 *
 * See: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
 */
export function changeTimezone(date: Date, timezone: string) {
    // '10/23/2023, 11:00:00 AM'
    const dateInUsFormat = date.toLocaleString('en-US', {timeZone: timezone});
    return new Date(dateInUsFormat);
}

export function setDkHours(date: Date, hours: number) {
    return setTimezoneHours(date, hours, 'europe/copenhagen');
}

function dateFormatterEnUsWithTz(timezone: string) {
    // '10/23/2023, 11:00:00 AM GMT+2'
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short'
    })
}

/**
 * The setTimezoneHours(), similar to setUTCHours, sets the hours according to the given timezone.
 */
export function setTimezoneHours(date: Date, hours: number, timezone: string) {
    // '10/23/2023, 11:00:00 AM GMT+2'
    const enUsDateStringParts = dateFormatterEnUsWithTz(timezone)
        .formatToParts(date)
        .map((p) => {
            if(p.type === 'hour')
                return hours.toString();
            return p.value;
        })

    // new Date('10/23/2023, 11:00:00 AM GMT+2') with the en-US format + tz info
    // seems to work across browsers.
    return new Date(enUsDateStringParts.join(''));
}

export function formatTime(date: Date): string {

    const hours = pad(date.getHours());
    const mins = pad(date.getMinutes());

    return `${hours}:${mins}`;
}
