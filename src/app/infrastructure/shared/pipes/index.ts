import { FormErrorPipe } from './form-error.pipe';
import { LocaleUpperCasePipe } from './locale-upper-case.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';
import { TrackByKeyPipe } from './track-by-key.pipe';

/**
 * Add pipes that do not need to be specifically referenced.
 */
export const pipes = [
  FormErrorPipe,
  LocaleUpperCasePipe,
  SentenceCasePipe,
  TrackByKeyPipe,
];
