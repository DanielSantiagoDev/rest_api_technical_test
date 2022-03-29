


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

export type BulkResponseType = {
    "id": string,
    "accountId": string,
    "count": number,
    "modified": string,
    "created": string,
    "status": string,
    "type" : string
  }

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
export type ListAssetsType = Array<Asset>;

export type Asset  = {
    "lastCall": {
      "servingNetwork": {
        "mcc": string,
        "mnc": string
      },
      "startTime": string,
      "endTime": string,
      "ipAddress": string,
      "imei": string,
      "bytes": number,
      "roundedBytes": number
    },
    "status": "active",
    "ownership": [
      string
    ],
    "id": string,
    "ownerAccountId": string,
    "ownerAccountName": string,
    "iccid": string,
    "fixedIPs": [
      {
        "carrier": string,
        "ip": string
      }
    ],
    "carriers": {
      "UKJ": boolean,
      "UKAT": boolean,
      "UKRO": boolean,
      "UKTM": boolean,
      "UKA": boolean,
      "UKK": boolean,
      "UKMX": boolean,
      "UKJBB": boolean,
      "UKP": boolean,
      "UKX": boolean,
      "ROAF": boolean,
      "ROCT": boolean,
      "NAQM": boolean,
      "NAVZ": boolean,
      "ROPD": boolean,
      "ROPDT": boolean,
      "NAMP": boolean,
      "EXPTMOB": boolean,
      "EXPBICS": boolean,
      "ROMK": boolean,
      "ROMT": boolean,
      "ROTL": boolean,
      "ROTN": boolean,
      "NAMR": boolean,
      "NATM": boolean,
      "NAMB": boolean,
      "NAC3": boolean,
      "ROAS": boolean,
      "ROWT": boolean,
      "NAEX": boolean,
      "ROPT": boolean,
      "ROPU": boolean,
      "ROPI": boolean,
      "ROPE": boolean,
      "TEST": boolean
    },
    "limit": number,
    "subscriptions": {
      "bundles": [
        {
          "dfProducts": {
            "DataPoolProduct": string,
            "PerMbProduct": string
          },
          "bundleId": string,
          "localProductId": string,
          "localProductName": string,
          "sharedDataPoolId": string,
          "initialSize": number,
          "remainingBytes": number,
          "preactivationInitialBytes": number,
          "preactivationRemainingBytes": number,
          "preactivationInitialSms": number,
          "preactivationRemainingSms": number,
          "preactivationInitialVoice": number,
          "preactivationRemainingVoice": number,
          "dataUsed": number,
          "startTime": string,
          "endTime": string,
          "cost": number,
          "remainingCredit": number,
          "creditUsed": number,
          "perMbCost": number,
          "type": string,
          "smsInitialSize": number,
          "remainingSms": number,
          "proratedSms": number,
          "smsUsed": number,
          "smsCreditUsed": number,
          "smsCost": number
        }
      ],
      "id": string,
      "accountId": string,
      "limit": number,
      "smsLimit": number
    },
    "setups": [
      {
        "accountId": string,
        "assetName": string,
        "alerts": [
          {
            "notification": string,
            "type": string,
            "limit": number,
            "enabled": boolean
          }
        ],
        "smsAlerts": [
          {
            "notification": string,
            "type": string,
            "limit": number,
            "enabled": boolean
          }
        ],
        "tags": [
          {
            "key": string,
            "value": string
          }
        ]
      }
    ],
    "msisdn": [
      string
    ],
    "virtualMSISDN": [
      string
    ],
    "model": string,
    "profileState": "onstock",
    "bootstrapEid": string,
    "activationDate": string,
    "deactivationDate": string,
    "reactivationDate": string,
    "subscriptionDate": string,
    "suspensionDate": string,
    "smsLimit": number,
    "lastSMS": {
      "type": string,
      "endTime": string,
      "originatingAddress": string,
      "destinationAddress": string,
      "servingNetwork": {
        "mcc": string,
        "mnc": string
      }
    },
    "securityServices": Array<any>
  }