import { Constants } from './constants';
import { Utils } from './utils';

describe('[Unit] Utils', () => {
  describe('getCopyrightYear()', () => {
    it('should return the current year as a string when the initial year is the current year', () => {
      Constants.initialCopyrightYear = new Date().getFullYear();
      const expectedValue = new Date().getFullYear().toString();

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });
  });

  describe('getCopyrightYear()', () => {
    it('should return a year range string from the initial year to the current year when the initial year is not the current year', () => {
      Constants.initialCopyrightYear = 2018;
      const expectedValue = `${Constants.initialCopyrightYear} - ${new Date().getFullYear().toString()}`;

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });
  });

  describe('getCopyrightYear()', () => {
    it('should return the current year as a string when the initial year is greater than the current year', () => {
      Constants.initialCopyrightYear = new Date().getFullYear() + 1;
      const expectedValue = new Date().getFullYear().toString();

      expect(Utils.getCopyrightYear()).toEqual(expectedValue);
    });
  });
});
