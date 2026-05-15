// api/services.ts
import { apiClient } from './client';
import { API_ENDPOINTS, API_CONFIG } from './constants';

// --- Types & Interfaces (Matching your D1 Production Schema) ---
export interface User {
  user_id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: number;
}

export interface MainAccount {
  main_account_id: number;
  user_id: number;
  total_balance: number;
  total_inflow: number;
  total_outflow: number;
  total_savings: number;
  updated_at: number;
}

export interface SubAccount {
  sub_account_id: number;
  user_id: number;
  account_name: string;
  total_balance: number;
  total_income: number;
  total_spend: number;
}

export interface MonthlySnapshot {
  snapshot_id: number;
  sub_account_id: number;
  month_year: string;
  monthly_inflow: number;
  monthly_outflow: number;
  top_category: string;
}

export interface Transaction {
  transaction_id: number;
  sub_account_id: number;
  timestamp: number;
  merchant: string;
  category: string;
  amount: number;
}

// Helper to clean and unpack D1 array wrappers if returned by the Worker backend
const unpackData = (res: any) => {
  if (!res || !res.data) return res;
  // If the Worker wraps the array in an envelope property
  if (res.data.results) return res.data.results;
  if (res.data.data) return res.data.data;
  return res.data;
};

// --- API Execution Methods ---
export const userAPI = {
  // Get user by ID -> Hits: /users/:id?value=123456789
  getById: async (userId: number): Promise<User> => {
    const response = await apiClient.get(`${API_ENDPOINTS.USER}/${userId}`, {
      params: { value: API_CONFIG.BEARER_TOKEN }
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data[0] : data;
  },

  // Get user by email -> Hits: /users?email=...&value=123456789
  getByEmail: async (email: string): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.USER, {
      params: { 
        email, 
        value: API_CONFIG.BEARER_TOKEN 
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data[0] : data;
  },
};

export const mainAccountAPI = {
  // Get main account by user ID -> Hits: /main_accounts/:id?value=123456789 or query variant
  getByUserId: async (userId: number): Promise<MainAccount> => {
    // Tries path matching extension first to safely find records inside table main_accounts
    const response = await apiClient.get(`${API_ENDPOINTS.MAIN_ACCOUNT}/${userId}`, {
      params: { 
        user_id: userId, // Backwards compatible fallback query parameter 
        value: API_CONFIG.BEARER_TOKEN 
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data[0] : data;
  },
};

export const subAccountsAPI = {
  // Get all sub-accounts for a user -> Hits: /sub_accounts?user_id=1&value=123456789
  getByUserId: async (userId: number): Promise<SubAccount[]> => {
    const response = await apiClient.get(API_ENDPOINTS.SUB_ACCOUNTS, {
      params: { 
        user_id: userId, 
        value: API_CONFIG.BEARER_TOKEN 
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data : [data];
  },

  // Get specific sub-account by ID -> Hits: /sub_accounts/:id?value=123456789
  getById: async (subAccountId: number): Promise<SubAccount> => {
    const response = await apiClient.get(`${API_ENDPOINTS.SUB_ACCOUNTS}/${subAccountId}`, {
      params: { value: API_CONFIG.BEARER_TOKEN }
    });
    return unpackData(response);
  },
};

export const monthlySnapshotsAPI = {
  // Get monthly snapshots for a sub-account -> Hits: /monthly_snapshots?sub_account_id=...
  getBySubAccountId: async (subAccountId: number): Promise<MonthlySnapshot[]> => {
    const response = await apiClient.get(API_ENDPOINTS.MONTHLY_SNAPSHOTS, {
      params: { 
        sub_account_id: subAccountId, 
        value: API_CONFIG.BEARER_TOKEN 
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data : [data];
  },

  // Get specific month snapshot -> Hits: /monthly_snapshots?sub_account_id=...&month_year=...
  getByMonth: async (subAccountId: number, monthYear: string): Promise<MonthlySnapshot> => {
    const response = await apiClient.get(API_ENDPOINTS.MONTHLY_SNAPSHOTS, {
      params: { 
        sub_account_id: subAccountId,
        month_year: monthYear,
        value: API_CONFIG.BEARER_TOKEN
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data[0] : data;
  },
};

export const transactionsAPI = {
  // Get all transactions for a sub-account -> Hits: /transactions?sub_account_id=...
  getBySubAccountId: async (subAccountId: number): Promise<Transaction[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS, {
      params: { 
        sub_account_id: subAccountId, 
        value: API_CONFIG.BEARER_TOKEN 
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data : [];
  },

  // Get transactions with date range filtering parameters
  getByDateRange: async (
    subAccountId: number, 
    startTimestamp: number, 
    endTimestamp: number
  ): Promise<Transaction[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS, {
      params: { 
        sub_account_id: subAccountId,
        start_date: startTimestamp,
        end_date: endTimestamp,
        value: API_CONFIG.BEARER_TOKEN
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data : [];
  },

  // Get transactions filter mapped by category
  getByCategory: async (subAccountId: number, category: string): Promise<Transaction[]> => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS, {
      params: { 
        sub_account_id: subAccountId,
        category,
        value: API_CONFIG.BEARER_TOKEN
      },
    });
    const data = unpackData(response);
    return Array.isArray(data) ? data : [];
  },
};