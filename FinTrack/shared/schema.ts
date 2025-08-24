import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  monthlyIncome: real("monthly_income").default(0),
  age: integer("age").default(0),
  riskTolerance: text("risk_tolerance").default("moderate"), // low, moderate, high
  createdAt: timestamp("created_at").defaultNow(),
});

export const bonds = pgTable("bonds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  couponRate: real("coupon_rate").notNull(),
  maturityYears: integer("maturity_years").notNull(),
  minInvestment: real("min_investment").notNull(),
  bondType: text("bond_type").notNull(), // government, corporate, fd
  riskRating: text("risk_rating").notNull(), // AAA, AA+, etc
  gstRate: real("gst_rate").default(0),
  tdsRate: real("tds_rate").default(10),
});

export const loans = pgTable("loans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  bank: text("bank").notNull(),
  loanType: text("loan_type").notNull(), // home, personal, education, car
  interestRate: real("interest_rate").notNull(),
  maxAmount: real("max_amount").notNull(),
  minAmount: real("min_amount").notNull(),
  maxTenure: integer("max_tenure").notNull(), // in years
  processingFee: real("processing_fee").notNull(), // percentage
  eligibilityMinIncome: real("eligibility_min_income").default(0),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // housing, food, transport, entertainment, unwanted, savings, income
  type: text("type").notNull(), // income, expense
  date: timestamp("date").defaultNow(),
});

export const userBonds = pgTable("user_bonds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  bondId: varchar("bond_id").references(() => bonds.id).notNull(),
  investedAmount: real("invested_amount").notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow(),
});

export const userLoans = pgTable("user_loans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  loanId: varchar("loan_id").references(() => loans.id).notNull(),
  loanAmount: real("loan_amount").notNull(),
  tenure: integer("tenure").notNull(), // in years
  emiAmount: real("emi_amount").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  status: text("status").default("active"), // active, closed
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  monthlyIncome: true,
  age: true,
  riskTolerance: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  amount: true,
  description: true,
  category: true,
  type: true,
});

export const insertUserBondSchema = createInsertSchema(userBonds).pick({
  userId: true,
  bondId: true,
  investedAmount: true,
});

export const insertUserLoanSchema = createInsertSchema(userLoans).pick({
  userId: true,
  loanId: true,
  loanAmount: true,
  tenure: true,
  emiAmount: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Bond = typeof bonds.$inferSelect;
export type Loan = typeof loans.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type UserBond = typeof userBonds.$inferSelect;
export type InsertUserBond = z.infer<typeof insertUserBondSchema>;
export type UserLoan = typeof userLoans.$inferSelect;
export type InsertUserLoan = z.infer<typeof insertUserLoanSchema>;
