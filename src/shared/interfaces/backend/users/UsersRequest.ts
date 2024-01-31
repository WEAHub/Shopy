export interface UsersParameters {
  limit: number;
  sort: UsersSorts;
}

export enum UsersSorts {
  DESC = 'desc',
  ASC = 'asc',
}
