import { SetMetadata } from '@nestjs/common';

/**
 * Roles Decorator.
 * Used to set roles for a route.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
