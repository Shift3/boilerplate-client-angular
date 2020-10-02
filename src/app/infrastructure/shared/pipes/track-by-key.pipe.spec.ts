import { environment } from '@env/environment.test';
import { Logger } from '@utils/logger';
import { TrackByKeyPipe } from './track-by-key.pipe';

!environment.testUnit
  ? Logger.log('Unit skipped')
  : describe('[Unit] TrackByKeyPipe', () => {
      const pipe = new TrackByKeyPipe();

      it(`should return the values from the indexed iterated object when provided a valid key`, () => {
        const key = 'data';
        const payload = [
          { id: 1, data: 'hello' },
          { id: 2, data: 'world' },
        ];

        payload.forEach((item, index) => {
          // pipe.transform(key)(index, item) is an example of currying: https://javascript.info/currying-partials
          expect(pipe.transform(key)(index, item)).toEqual(payload[index].data);
        });
      });

      it(`should should show a console warning when it cannot use the provided key`, () => {
        const key = 'foo';
        const testPayload = [{ id: 1, data: 'hello' }];
        const spy = spyOn(Logger, 'warn');
        testPayload.forEach((item, index) => {
          pipe.transform(key)(index, item);
        });

        expect(spy).toHaveBeenCalled();
      });
    });
