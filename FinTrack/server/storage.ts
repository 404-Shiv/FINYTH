import { type User, type InsertUser, type Bond, type Loan, type Transaction, type InsertTransaction, type UserBond, type InsertUserBond, type UserLoan, type InsertUserLoan } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bond methods
  getAllBonds(): Promise<Bond[]>;
  getBondsByRisk(riskTolerance: string): Promise<Bond[]>;
  getBond(id: string): Promise<Bond | undefined>;
  
  // Loan methods
  getAllLoans(): Promise<Loan[]>;
  getLoansByType(loanType: string): Promise<Loan[]>;
  getLoan(id: string): Promise<Loan | undefined>;
  
  // Transaction methods
  getUserTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByCategory(userId: string, category: string): Promise<Transaction[]>;
  
  // User investments
  getUserBonds(userId: string): Promise<(UserBond & { bond: Bond })[]>;
  createUserBond(userBond: InsertUserBond): Promise<UserBond>;
  getUserLoans(userId: string): Promise<(UserLoan & { loan: Loan })[]>;
  createUserLoan(userLoan: InsertUserLoan): Promise<UserLoan>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private bonds: Map<string, Bond> = new Map();
  private loans: Map<string, Loan> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private userBonds: Map<string, UserBond> = new Map();
  private userLoans: Map<string, UserLoan> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Sample bonds data
    const bondsData: Bond[] = [
      {
        id: "bond-1",
        name: "SBI Fixed Deposit",
        issuer: "State Bank of India",
        couponRate: 7.5,
        maturityYears: 5,
        minInvestment: 10000,
        bondType: "fd",
        riskRating: "AAA",
        gstRate: 18,
        tdsRate: 10,
      },
      {
        id: "bond-2",
        name: "HDFC Corporate Bond",
        issuer: "HDFC Bank",
        couponRate: 8.2,
        maturityYears: 3,
        minInvestment: 25000,
        bondType: "corporate",
        riskRating: "AA+",
        gstRate: 18,
        tdsRate: 10,
      },
      {
        id: "bond-3",
        name: "Government Bond 2029",
        issuer: "Government of India",
        couponRate: 7.3,
        maturityYears: 7,
        minInvestment: 1000,
        bondType: "government",
        riskRating: "AAA",
        gstRate: 0,
        tdsRate: 0,
      },
    ];

    // Sample loans data
    const loansData: Loan[] = [
      {
        id: "loan-1",
        name: "HDFC Home Loan",
        bank: "HDFC Bank",
        loanType: "home",
        interestRate: 8.5,
        maxAmount: 12000000,
        minAmount: 100000,
        maxTenure: 30,
        processingFee: 0.5,
        eligibilityMinIncome: 50000,
      },
      {
        id: "loan-2",
        name: "SBI Education Loan",
        bank: "State Bank of India",
        loanType: "education",
        interestRate: 7.8,
        maxAmount: 2000000,
        minAmount: 50000,
        maxTenure: 15,
        processingFee: 0,
        eligibilityMinIncome: 30000,
      },
      {
        id: "loan-3",
        name: "ICICI Personal Loan",
        bank: "ICICI Bank",
        loanType: "personal",
        interestRate: 12.5,
        maxAmount: 4000000,
        minAmount: 50000,
        maxTenure: 5,
        processingFee: 2.5,
        eligibilityMinIncome: 25000,
      },
    ];

    bondsData.forEach(bond => this.bonds.set(bond.id, bond));
    loansData.forEach(loan => this.loans.set(loan.id, loan));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllBonds(): Promise<Bond[]> {
    return Array.from(this.bonds.values());
  }

  async getBondsByRisk(riskTolerance: string): Promise<Bond[]> {
    const bonds = Array.from(this.bonds.values());
    // Filter bonds based on risk tolerance
    if (riskTolerance === "low") {
      return bonds.filter(bond => bond.riskRating.includes("AAA"));
    } else if (riskTolerance === "moderate") {
      return bonds.filter(bond => bond.riskRating.includes("AA"));
    }
    return bonds;
  }

  async getBond(id: string): Promise<Bond | undefined> {
    return this.bonds.get(id);
  }

  async getAllLoans(): Promise<Loan[]> {
    return Array.from(this.loans.values());
  }

  async getLoansByType(loanType: string): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(loan => loan.loanType === loanType);
  }

  async getLoan(id: string): Promise<Loan | undefined> {
    return this.loans.get(id);
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      date: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByCategory(userId: string, category: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId && transaction.category === category);
  }

  async getUserBonds(userId: string): Promise<(UserBond & { bond: Bond })[]> {
    const userBondsList = Array.from(this.userBonds.values())
      .filter(userBond => userBond.userId === userId);
    
    return userBondsList.map(userBond => ({
      ...userBond,
      bond: this.bonds.get(userBond.bondId)!,
    }));
  }

  async createUserBond(insertUserBond: InsertUserBond): Promise<UserBond> {
    const id = randomUUID();
    const userBond: UserBond = { 
      ...insertUserBond, 
      id,
      purchaseDate: new Date(),
    };
    this.userBonds.set(id, userBond);
    return userBond;
  }

  async getUserLoans(userId: string): Promise<(UserLoan & { loan: Loan })[]> {
    const userLoansList = Array.from(this.userLoans.values())
      .filter(userLoan => userLoan.userId === userId);
    
    return userLoansList.map(userLoan => ({
      ...userLoan,
      loan: this.loans.get(userLoan.loanId)!,
    }));
  }

  async createUserLoan(insertUserLoan: InsertUserLoan): Promise<UserLoan> {
    const id = randomUUID();
    const userLoan: UserLoan = { 
      ...insertUserLoan, 
      id,
      startDate: new Date(),
      status: "active",
    };
    this.userLoans.set(id, userLoan);
    return userLoan;
  }
}

export const storage = new MemStorage();
