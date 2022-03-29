


export type LoginResponseType = {
    token: string,
    user: {
      profile: {},
      favorites: [Object],
      twoFaStrategy: [Object],
      _id: string,
      username: string,
      email: string,
      permissions: Array<Object>,
      setup: Object,
      status: string,
    }
};