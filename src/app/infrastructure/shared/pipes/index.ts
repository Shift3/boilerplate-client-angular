import { CapitalizePipe } from './capitalize.pipe';
import { FormErrorPipe } from './form-error.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';
import { TrackByKeyPipe } from './track-by-key.pipe';

/**
 * Add pipes that do not need to be specifically referenced.
 */
export const pipes = [
  CapitalizePipe,
  FormErrorPipe,
  SentenceCasePipe,
  TrackByKeyPipe,
];
