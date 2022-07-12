import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

/**
 * Algorithm for Validating ObjectId.
 * @param id ObjectId to be validated.
 * @returns {Promise<boolean>} True if valid ObjectId / throw badrequest if not valid.
 */
export async function validateObjectId(id: string | any): Promise<boolean> {
  const isValid = isValidObjectId(id);
  if (!isValid) throw new BadRequestException('Invalid Id');
  return isValid;
}
