import { CapitalizePipe } from './capitalize.pipe';
import { environment } from '@env/environment.test';
import { Logger } from '@app/infrastructure/utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] CapitalizePipe', () => {
      const pipe = new CapitalizePipe();

      it('should return the capitalized first letter of the string', () => {
        const inputValue: string = 'daniel',
          expectedValue: string = 'Daniel';
        expect(pipe.transform(inputValue)).toEqual(expectedValue);
      });

      it('should return an empty string when falsy', () => {
        const inputValue: string = '',
          expectedValue: string = '';
        expect(pipe.transform(inputValue)).toEqual(expectedValue);
      });
    });
