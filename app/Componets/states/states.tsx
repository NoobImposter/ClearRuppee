import { create } from 'zustand';
import axios from 'axios';

import {
  userAPI,
  mainAccountAPI,
  subAccountsAPI,
  transactionsAPI,
  type Transaction,
  type SubAccount,
} from '../apis';

// --- Types & Interfaces ---
interface CategoryValue {
  category: string;
  amount: number;
  percentage: number;
}

interface MerchantValue {
  merchant: string;
  amount: number;
}

interface FinanceStore {
  // User Profile
  accountName: string;
  username: string;
  userId: number | null;

  // Sub-Account Navigation (global switch state)
  subAccounts: SubAccount[];           // all sub-accounts for the user (loaded once)
  activeSubAccountId: number | null;   // which sub-account the navbar has selected
  currentMonth: string;

  // Home Page Metrics (from mainAccount — user-wide)
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
  homeTopCategories: CategoryValue[];

  // Transactions Page Metrics (per active sub-account)
  transactionsTotalIncome: number;
  transactionsTotalExpense: number;

  // Insights Page Metrics (per active sub-account)
  totalSpend: number;
  avgDailyBurn: number;
  topCategory: string;
  savingsPotential: number;
  insightsTopCategories: CategoryValue[];
  insightsTopMerchants: MerchantValue[];

  // Loading states — separate so navbar doesn't freeze during sub-account switch
  isLoading: boolean;          // initial full load
  isSubAccountLoading: boolean; // lightweight switch load
  error: string | null;

  // Actions
  fetchUserData: (userId: number) => Promise<void>;
  switchSubAccount: (subAccountId: number) => Promise<void>;
  resetToDefault: () => void;
}

// --- Initial State ---
const initialState = {
  accountName: '',
  username: '',
  userId: null,
  subAccounts: [],
  activeSubAccountId: null,
  currentMonth: '',
  totalBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
  totalSavings: 0,
  homeTopCategories: [],
  transactionsTotalIncome: 0,
  transactionsTotalExpense: 0,
  totalSpend: 0,
  avgDailyBurn: 0,
  topCategory: '',
  savingsPotential: 0,
  insightsTopCategories: [],
  insightsTopMerchants: [],
  isLoading: false,
  isSubAccountLoading: false,
  error: null,
};

// --- Helper Functions ---
const calculateCategoryBreakdown = (transactions: Transaction[]): CategoryValue[] => {
  if (!transactions || transactions.length === 0) return [];
  const categoryMap = new Map<string, number>();
  let totalExpense = 0;

  transactions.forEach((tx) => {
    if (tx && tx.amount < 0) {
      const absAmount = Math.abs(tx.amount);
      totalExpense += absAmount;
      const catName = tx.category || 'Other';
      categoryMap.set(catName, (categoryMap.get(catName) || 0) + absAmount);
    }
  });

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
};

const calculateMerchantBreakdown = (transactions: Transaction[]): MerchantValue[] => {
  if (!transactions || transactions.length === 0) return [];
  const merchantMap = new Map<string, number>();

  transactions.forEach((tx) => {
    if (tx && tx.amount < 0) {
      const absAmount = Math.abs(tx.amount);
      const merchName = tx.merchant || 'Unknown Merchant';
      merchantMap.set(merchName, (merchantMap.get(merchName) || 0) + absAmount);
    }
  });

  return Array.from(merchantMap.entries())
    .map(([merchant, amount]) => ({ merchant, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);
};

const formatMonthYear = (timestamp: number): string => {
  if (!timestamp || isNaN(timestamp)) return '';
  const date = new Date(timestamp < 100000000000 ? timestamp * 1000 : timestamp);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Shared: derive all per-sub-account metrics from a transaction list
const deriveSubAccountMetrics = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(tx => tx && tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = Math.abs(
    transactions
      .filter(tx => tx && tx.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0)
  );

  const topCategories = calculateCategoryBreakdown(transactions);
  const topMerchants = calculateMerchantBreakdown(transactions);

  const avgDailyBurn = Math.round(totalExpense / 30);

  const validTimestamps = transactions
    .map(tx => tx?.timestamp)
    .filter((t): t is number => t !== undefined && t !== null && !isNaN(t));

  const currentMonth =
    validTimestamps.length > 0
      ? formatMonthYear(Math.max(...validTimestamps))
      : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const topCategory = topCategories.length > 0 ? topCategories[0].category : 'None';
  const savingsPotential = Math.round(totalIncome * 0.2);

  return {
    currentMonth,
    transactionsTotalIncome: totalIncome,
    transactionsTotalExpense: totalExpense,
    totalSpend: totalExpense,
    avgDailyBurn,
    topCategory,
    savingsPotential,
    insightsTopCategories: topCategories,
    insightsTopMerchants: topMerchants,
    homeTopCategories: topCategories,
  };
};

// --- Zustand Store ---
export const useFinanceStore = create<FinanceStore>((set, get) => ({
  ...initialState,

  // ─────────────────────────────────────────────────────────────
  // INITIAL LOAD — fetches user, main account, all sub-accounts,
  // then auto-loads the first sub-account's transactions.
  // Called once on app boot / login.
  // ─────────────────────────────────────────────────────────────
  fetchUserData: async (userId: number) => {
    set({ isLoading: true, error: null });

    try {
      // Parallel fetch: user profile + main account + sub-account list
      const [user, mainAccount, subAccounts] = await Promise.all([
        userAPI.getById(userId).catch(() => ({ name: 'Fintech User', email: 'user@clearrupee.com' })),
        mainAccountAPI.getByUserId(userId).catch(() => ({
          total_balance: 0,
          total_inflow: 0,
          total_outflow: 0,
          total_savings: 0,
        })),
        subAccountsAPI.getByUserId(userId).catch(() => [] as SubAccount[]),
      ]);

      const resolvedName = user?.name || 'Fintech User';
      const resolvedUsername = user?.email ? `@${user.email.split('@')[0]}` : '@user';

      // Pick the first sub-account as the default active one
      const firstSubAccount = Array.isArray(subAccounts) && subAccounts.length > 0
        ? subAccounts[0]
        : null;

      // Write everything we know so far — UI can render account list immediately
      set({
        userId,
        accountName: resolvedName,
        username: resolvedUsername,
        subAccounts: Array.isArray(subAccounts) ? subAccounts : [],
        activeSubAccountId: firstSubAccount?.sub_account_id ?? null,
        totalBalance: mainAccount?.total_balance ?? 0,
        totalIncome: mainAccount?.total_inflow ?? 0,
        totalExpense: mainAccount?.total_outflow ?? 0,
        totalSavings: mainAccount?.total_savings ?? 0,
        isLoading: false,
        error: null,
      });

      // Now load transactions for the first sub-account
      if (firstSubAccount) {
        await get().switchSubAccount(firstSubAccount.sub_account_id);
      }
    } catch (error: any) {
      console.error('--- fetchUserData Error ---', error);

      let parsedErrorMessage = 'Failed to load financial profile.';
      if (axios.isAxiosError(error) && error.response) {
        parsedErrorMessage = `Backend Error [${error.response.status}]: ${JSON.stringify(error.response.data)}`;
      } else if (error instanceof Error) {
        parsedErrorMessage = error.message;
      }

      set({ isLoading: false, error: parsedErrorMessage });
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SUB-ACCOUNT SWITCH — called by the Navbar when user taps a
  // different account. Fetches only that account's transactions
  // and recomputes all derived metrics. Fast & non-blocking.
  // ─────────────────────────────────────────────────────────────
  switchSubAccount: async (subAccountId: number) => {
    // Prevent redundant fetches if already on this account
    if (get().activeSubAccountId === subAccountId && get().transactionsTotalIncome !== 0) return;

    set({ isSubAccountLoading: true, activeSubAccountId: subAccountId, error: null });

    try {
      const transactions = await transactionsAPI.getBySubAccountId(subAccountId);
      const metrics = deriveSubAccountMetrics(Array.isArray(transactions) ? transactions : []);

      set({
        ...metrics,
        isSubAccountLoading: false,
      });
    } catch (error: any) {
      console.error('--- switchSubAccount Error ---', error);

      let parsedErrorMessage = 'Failed to load account transactions.';
      if (axios.isAxiosError(error) && error.response) {
        parsedErrorMessage = `Backend Error [${error.response.status}]: ${JSON.stringify(error.response.data)}`;
      } else if (error instanceof Error) {
        parsedErrorMessage = error.message;
      }

      set({ isSubAccountLoading: false, error: parsedErrorMessage });
    }
  },

  resetToDefault: () => set(() => ({ ...initialState })),
}));