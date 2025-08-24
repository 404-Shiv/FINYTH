import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertUserBondSchema, insertUserLoanSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Bonds routes
  app.get("/api/bonds", async (req, res) => {
    try {
      const bonds = await storage.getAllBonds();
      res.json(bonds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bonds" });
    }
  });

  app.get("/api/bonds/:id", async (req, res) => {
    try {
      const bond = await storage.getBond(req.params.id);
      if (!bond) {
        return res.status(404).json({ error: "Bond not found" });
      }
      res.json(bond);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bond" });
    }
  });

  app.get("/api/bonds/risk/:riskTolerance", async (req, res) => {
    try {
      const bonds = await storage.getBondsByRisk(req.params.riskTolerance);
      res.json(bonds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bonds by risk" });
    }
  });

  // Loans routes
  app.get("/api/loans", async (req, res) => {
    try {
      const loans = await storage.getAllLoans();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loans" });
    }
  });

  app.get("/api/loans/:id", async (req, res) => {
    try {
      const loan = await storage.getLoan(req.params.id);
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.json(loan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loan" });
    }
  });

  app.get("/api/loans/type/:loanType", async (req, res) => {
    try {
      const loans = await storage.getLoansByType(req.params.loanType);
      res.json(loans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch loans by type" });
    }
  });

  // Transactions routes
  app.get("/api/transactions/:userId", async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(req.params.userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  app.get("/api/transactions/:userId/category/:category", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByCategory(
        req.params.userId, 
        req.params.category
      );
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions by category" });
    }
  });

  // User investments routes
  app.get("/api/user-bonds/:userId", async (req, res) => {
    try {
      const userBonds = await storage.getUserBonds(req.params.userId);
      res.json(userBonds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user bonds" });
    }
  });

  app.post("/api/user-bonds", async (req, res) => {
    try {
      const validatedData = insertUserBondSchema.parse(req.body);
      const userBond = await storage.createUserBond(validatedData);
      res.status(201).json(userBond);
    } catch (error) {
      res.status(400).json({ error: "Invalid user bond data" });
    }
  });

  app.get("/api/user-loans/:userId", async (req, res) => {
    try {
      const userLoans = await storage.getUserLoans(req.params.userId);
      res.json(userLoans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user loans" });
    }
  });

  app.post("/api/user-loans", async (req, res) => {
    try {
      const validatedData = insertUserLoanSchema.parse(req.body);
      const userLoan = await storage.createUserLoan(validatedData);
      res.status(201).json(userLoan);
    } catch (error) {
      res.status(400).json({ error: "Invalid user loan data" });
    }
  });

  // Financial calculations endpoint
  app.post("/api/calculate/bond-returns", async (req, res) => {
    try {
      const { bondId, investmentAmount, inflationRate = 5 } = req.body;
      const bond = await storage.getBond(bondId);
      
      if (!bond) {
        return res.status(404).json({ error: "Bond not found" });
      }

      // Calculate real returns after taxes, fees, and inflation
      const grossReturn = bond.couponRate;
      const afterTax = grossReturn * (1 - (bond.tdsRate || 0) / 100);
      const afterGST = afterTax * (1 - (bond.gstRate || 0) / 100);
      const realReturn = afterGST - inflationRate;

      const projectedReturns = [];
      let currentValue = investmentAmount;

      for (let year = 1; year <= bond.maturityYears; year++) {
        currentValue = currentValue * (1 + realReturn / 100);
        projectedReturns.push({
          year,
          value: Math.round(currentValue),
          realReturn: realReturn.toFixed(2)
        });
      }

      res.json({
        bondName: bond.name,
        investmentAmount,
        grossReturn,
        realReturn: realReturn.toFixed(2),
        projectedReturns
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate bond returns" });
    }
  });

  app.post("/api/calculate/save-score", async (req, res) => {
    try {
      const { userId } = req.body;
      const transactions = await storage.getUserTransactions(userId);
      
      const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const unwantedExpenses = transactions
        .filter(t => t.type === "expense" && t.category === "unwanted")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
      const unwantedRate = expenses > 0 ? (unwantedExpenses / expenses) * 100 : 0;
      
      // Calculate save score (0-100 scale)
      let saveScore = 50; // Base score
      saveScore += (savingsRate - 20); // Bonus for savings above 20%
      saveScore -= unwantedRate; // Penalty for unwanted expenses
      saveScore = Math.max(0, Math.min(100, saveScore)); // Clamp between 0-100

      res.json({
        saveScore: saveScore.toFixed(1),
        savingsRate: savingsRate.toFixed(1),
        unwantedRate: unwantedRate.toFixed(1),
        totalIncome: income,
        totalExpenses: expenses
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate save score" });
    }
  });

  // EMI calculation endpoint
  app.post("/api/calculate/emi", async (req, res) => {
    try {
      const { loanAmount, interestRate, tenureYears } = req.body;
      
      if (!loanAmount || !interestRate || !tenureYears) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const monthlyRate = interestRate / (12 * 100);
      const numberOfPayments = tenureYears * 12;
      
      let emi = 0;
      if (monthlyRate === 0) {
        emi = loanAmount / numberOfPayments;
      } else {
        emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }

      const totalAmount = emi * numberOfPayments;
      const totalInterest = totalAmount - loanAmount;

      res.json({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        loanAmount,
        interestRate,
        tenureYears
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate EMI" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
