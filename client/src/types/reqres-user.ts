export type ReqResUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type ReqResUsersPage = {
  users: ReqResUser[];
  page: number;
  totalPages: number;
};
