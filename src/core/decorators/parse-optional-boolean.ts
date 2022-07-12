import { Transform } from 'class-transformer';
import { optionalBooleanMapper } from '../mappers/optional-boolean-mapper';

export const ParseOptionalBoolean = () =>
  Transform(({ value }) => optionalBooleanMapper.get(value));
