import { parsePhoneNumber } from 'libphonenumber-js';

/**
 * Formats a phone number
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  return parsePhoneNumber(phoneNumber, 'ID').number.toString();
}
