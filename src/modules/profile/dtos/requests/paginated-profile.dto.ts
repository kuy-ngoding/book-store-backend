import { Profile } from '../../entities/profile.entity';

export class ProfilePaginatedDto {
  constructor(
    public data: Profile[],
    public total: number,
    public page: number,
    public limit: number,
  ) {}
}
