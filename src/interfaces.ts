


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


export type CreateUserResponseType = {
    "_id": string,
    "username": string,
    "email": string,
    "lastAccess": string,
    "status": string,
    "permissions": [
      {
        "accountId": string,
        "roles": [
          string
        ]
      }
    ],
    "favorites": {
      "disims": [
        string
      ],
      "summaries": [
        string
      ],
      "billing": [
        string
      ],
      "users": [
        string
      ],
      "products": [
        string
      ],
      "accounts": [
        string
      ],
      "assets": [
        string
      ],
      "imsis": [
        string
      ]
    },
    "profile": {
      "picture": string,
      "language": string,
      "timezone": string
    }
  }