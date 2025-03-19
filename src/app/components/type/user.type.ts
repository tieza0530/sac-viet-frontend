export type UserData = {
  data: {
    account: string, 
    email: string,
    authenticated: string,
    role: [string],
    info: infoUser
  }
};

export type infoUser = {
  fullname: string,
  phoneNumber: string,
  address: [string],
  avatar: string,
  dateOfBirth: Date,
  gender: string,
}
