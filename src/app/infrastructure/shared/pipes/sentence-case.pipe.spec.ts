import { SentenceCasePipe } from './sentence-case.pipe';
import { environment } from '@env/environment.test';
import { Logger } from '@app/infrastructure/utils/logger';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] SentenceCasePipe', () => {
      const pipe = new SentenceCasePipe();

      it('should return the Sentence Case string', () => {
        const inputValue: string = 'firstName',
          expectedValue: string = 'First Name';
        expect(pipe.transform(inputValue)).toEqual(expectedValue);
      });

      it('should return an empty string when falsy', () => {
        const inputValue: string = '',
          expectedValue: string = '';
        expect(pipe.transform(inputValue)).toEqual(expectedValue);
      });
    });
