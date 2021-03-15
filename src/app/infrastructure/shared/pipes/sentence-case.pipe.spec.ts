import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { SentenceCasePipe } from './sentence-case.pipe';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] SentenceCasePipe', () => {
      const pipe = new SentenceCasePipe();

      it('should return an empty string when given an empty string', () => {
        const mockString = '';
        const expectedValue = '';

        expect(pipe.transform(mockString)).toEqual(expectedValue);
      });

      it('should return the sentence case string for a camelCaseString', () => {
        const mockString = 'camelCaseString';
        const expectedValue = 'Camel Case String';

        expect(pipe.transform(mockString)).toEqual(expectedValue);
      });

      it('should return the Capital case string for a normal string', () => {
        const mockString = 'normal string';
        const expectedValue = 'Normal string';

        expect(pipe.transform(mockString)).toEqual(expectedValue);
      });
    });
