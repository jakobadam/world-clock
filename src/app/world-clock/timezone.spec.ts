import { changeTimezone, setTimezoneHours } from './timezone';

describe('timezone', () => {
  describe(`setTimezoneHours()`, () => {
    it('should set hour according to given timezone', () => {
      const date = setTimezoneHours(
        new Date('2023-10-23T00:00:00.000Z'),
        8,
        'Europe/Copenhagen',
      );

      expect(date.toISOString()).toBe('2023-10-23T06:00:00.000Z');

      const date_23 = setTimezoneHours(
        new Date('2023-10-23T00:00:00.000Z'),
        23,
        'Europe/Copenhagen',
      );

      expect(date_23.toISOString()).toBe('2023-10-23T21:00:00.000Z');
    });
  });

  describe('changeTimezone()', () => {
    it('should convert to UTC', () => {
      const date = changeTimezone(new Date('2023-10-23T09:00:00.000Z'), 'UTC');

      expect(date.getHours()).toBe(9);
    });

    it('should convert to DK', () => {
      const date = changeTimezone(
        new Date('2023-10-23T09:00:00.000Z'),
        'Europe/Copenhagen',
      );

      expect(date.getHours()).toBe(11);
    });
  });
});
