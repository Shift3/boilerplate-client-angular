import { Constants } from './constants';
import { Logger } from './logger';
import { Utils } from './utils';

describe('[Unit] Utils', () => {
  describe('getCopyrightYear()', () => {
    it('should return the current year as a string when the initial year is the current year', () => {
      Constants.initialCopyrightYear = new Date().getFullYear();
      const expectedValue = new Date().getFullYear().toString();

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });

    it('should return a year range string when the initial year is less than the current year', () => {
      Constants.initialCopyrightYear = new Date().getFullYear() - 1;
      const expectedValue = `${Constants.initialCopyrightYear} - ${new Date().getFullYear().toString()}`;

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });

    it('should return the current year as a string when the initial year is greater than the current year', () => {
      Constants.initialCopyrightYear = new Date().getFullYear() + 1;
      const expectedValue = new Date().getFullYear().toString();

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });
  });

  describe('trackByValue()', () => {
    it('should return the key when found', () => {
      const index = 0;
      const value = {
        id: 1,
        name: 'Test',
      };
      const key = 'id';
      const expectedValue = 1;

      expect(Utils.trackByValue(index, value, key)).toEqual(expectedValue);
    });

    it('should should throw a console warning when it cannot use the provided key', () => {
      const index = 0;
      const value = {
        id: 1,
        name: 'Test',
      };
      const key = 'foo';

      const spy = spyOn(Logger, 'warn');
      Utils.trackByValue(index, value, key);

      expect(spy).toHaveBeenCalled();
    });
  });
});
