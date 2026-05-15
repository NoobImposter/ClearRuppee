// api/constants.ts
export const API_CONFIG = {
  // Kept clean without a trailing slash to handle path splicing correctly
  BASE_URL: 'API Key ',
  
  // The secret value passed for authentication
  BEARER_TOKEN: '123456789',
} as const;

export const API_ENDPOINTS = {
  // Standardized resource definitions matching your D1 database schemas
  USER: '/users',
  MAIN_ACCOUNT: '/main_accounts',
  SUB_ACCOUNTS: '/sub_accounts',
  MONTHLY_SNAPSHOTS: '/monthly_snapshots',
  TRANSACTIONS: '/transactions',
} as const;