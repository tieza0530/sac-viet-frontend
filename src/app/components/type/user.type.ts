type UserData = {
  _id: string;
  account: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ApiResponse = {
  data: UserData;
  message: string;
};
