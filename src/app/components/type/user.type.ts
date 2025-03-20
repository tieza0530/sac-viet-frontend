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
  address: [{_id: string, address: string, phone:string}],
  avatar: string,
  dateOfBirth: Date,
  gender: string,
}
