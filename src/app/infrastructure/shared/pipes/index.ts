import { FormErrorPipe } from './form-error.pipe';
import { TrackByKeyPipe } from './track-by-key.pipe';

/**
 * Add pipes that do not need to be specifically referenced.
 */
export const pipes = [FormErrorPipe, TrackByKeyPipe];
