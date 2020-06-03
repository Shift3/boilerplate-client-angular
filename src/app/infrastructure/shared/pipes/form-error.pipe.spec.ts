import { environment } from '../../../../environments/environment.test';
import { FormErrorPipe } from './form-error.pipe';
import { Logger } from '../../utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] FormErrorPipe', () => {
    const pipe = new FormErrorPipe();

    it('should return the first value as a string', () => {
      const error = {
        incorrectMailFormat: 'Invalid email.',
        required: true,
      };
      const expectedValue: string = 'Invalid email.';
      expect(pipe.transform(error)).toEqual(expectedValue);
    });

    it('should return an empty string when falsy', () => {
      const error = null;
      const expectedValue: string = '';
      expect(pipe.transform(error)).toEqual(expectedValue);
    });

    it('should return the parameter when not an object', () => {
      const error: string = 'test';
      expect(pipe.transform(error)).toEqual(error);
    });
  });
