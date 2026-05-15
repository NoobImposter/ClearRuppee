export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  icon: string;
  category: string;
  categoryColor: {
    bg: string;
    text: string;
  };
  amount: number;
  balance: number;
  isUnusual: boolean;
}

export interface TransactionItemProps {
  transaction: Transaction;
}