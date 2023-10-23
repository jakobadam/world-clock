export function getSupportedTimezones(): string[] {
    return (Intl as any).supportedValuesOf('timeZone');
}

/**
 * Change timezone of the given date.
 *
 * en-US formatted date strings, e.g., '10/23/2023, 11:00:00 AM', as input for `Date()` works well.
 *
 * See: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
 */
export function changeTimezone(date: Date, timezone: string) {
    const dateInUsFormat = date.toLocaleString('en-US', {timeZone: timezone});
    return new Date(dateInUsFormat);
}

export function setDkHours(date: Date, hours: number) {
    return setTimezoneHours(date, hours, 'europe/copenhagen');
}

/**
 * Gets a en-US date string formatter, with an appended timezone.
 *
 * Produces a date string, such as: '10/23/2023, 11:00:00 GMT+2', parsable by Date().
 */
function dateFormatterEnUsWithTz(timezone: string) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        hour12: false,
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
    const parts = dateFormatterEnUsWithTz(timezone)
        .formatToParts(date)
        .map((p) => {
            if(p.type === 'hour')
                return hours.toString();
            return p.value;
        })
    return new Date(parts.join(''));
}

export function formatTime(date: Date): string {
    const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;

    const hours = pad(date.getHours());
    const mins = pad(date.getMinutes());

    return `${hours}:${mins}`;
}
