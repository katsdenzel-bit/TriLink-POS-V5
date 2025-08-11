export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  macAddress?: string;
  isActive: boolean;
  currentPlan?: Plan;
  expiresAt?: Date;
  dataUsed: number;
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  duration: number; // in hours
  price: number;
  type: 'daily' | 'weekly' | 'monthly';
  discount: number;
  description: string;
}

export interface Voucher {
  id: string;
  code: string;
  planId: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: Date;
  createdAt: Date;
  expiresAt: Date;
}

export interface UsageRecord {
  id: string;
  userId: string;
  dataUsed: number;
  timestamp: Date;
  sessionDuration: number;
}

export interface Payment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  method: 'voucher' | 'cash' | 'mobile_money';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export const defaultPlans: Plan[] = [
  {
    id: '1',
    name: 'Instant Surf',
    duration: 24,
    price: 1500,
    type: 'daily',
    discount: 0,
    description: 'Perfect for daily browsing and social media'
  },
  {
    id: '2',
    name: 'Flexi Surf',
    duration: 168, // 7 days
    price: 9975,
    type: 'weekly',
    discount: 5,
    description: 'Best value for students and regular users'
  },
  {
    id: '3',
    name: 'Endless Surf',
    duration: 720, // 30 days
    price: 40500,
    type: 'monthly',
    discount: 10,
    description: 'Unlimited access for power users'
  }
];