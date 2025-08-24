import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Settings, Shield, Bell, CreditCard, Target } from "lucide-react";

export default function Profile() {
  return (
    <div data-testid="profile-page">
      <Header 
        title="Profile & Settings" 
        subtitle="Manage your account and financial preferences" 
      />
      
      <div className="p-6 space-y-6">
        {/* Profile Information */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 text-teal-primary mr-2" />
            <h3 className="text-lg font-semibold text-white" data-testid="profile-info-title">
              Profile Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name" className="text-gray-light">Full Name</Label>
                <Input 
                  id="full-name"
                  defaultValue="Shiv" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-full-name"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-light">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  defaultValue="shiv@example.com" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-light">Phone Number</Label>
                <Input 
                  id="phone"
                  defaultValue="+91 98765 43210" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-phone"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="age" className="text-gray-light">Age</Label>
                <Input 
                  id="age"
                  type="number"
                  defaultValue="28" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-age"
                />
              </div>
              
              <div>
                <Label htmlFor="monthly-income" className="text-gray-light">Monthly Income (₹)</Label>
                <Input 
                  id="monthly-income"
                  type="number"
                  defaultValue="85000" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-monthly-income"
                />
              </div>
              
              <div>
                <Label htmlFor="risk-tolerance" className="text-gray-light">Risk Tolerance</Label>
                <Select defaultValue="moderate" data-testid="select-risk-tolerance-profile">
                  <SelectTrigger className="mt-1 bg-dark-tertiary border-gray-medium text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-tertiary border-gray-medium">
                    <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                    <SelectItem value="moderate">Moderate Risk</SelectItem>
                    <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button className="bg-teal-primary hover:bg-teal-secondary text-dark-primary" data-testid="button-save-profile">
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Financial Goals */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center mb-6">
            <Target className="w-5 h-5 text-teal-primary mr-2" />
            <h3 className="text-lg font-semibold text-white" data-testid="financial-goals-title">
              Financial Goals
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="emergency-fund" className="text-gray-light">Emergency Fund Target (₹)</Label>
                <Input 
                  id="emergency-fund"
                  type="number"
                  defaultValue="500000" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-emergency-fund"
                />
              </div>
              
              <div>
                <Label htmlFor="retirement-age" className="text-gray-light">Target Retirement Age</Label>
                <Input 
                  id="retirement-age"
                  type="number"
                  defaultValue="60" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-retirement-age"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-goal" className="text-gray-light">Annual Investment Target (₹)</Label>
                <Input 
                  id="investment-goal"
                  type="number"
                  defaultValue="200000" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-investment-goal"
                />
              </div>
              
              <div>
                <Label htmlFor="savings-rate" className="text-gray-light">Target Savings Rate (%)</Label>
                <Input 
                  id="savings-rate"
                  type="number"
                  defaultValue="30" 
                  className="mt-1 bg-dark-tertiary border-gray-medium text-white"
                  data-testid="input-savings-rate"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Connected Accounts */}
        <Card className="bg-dark-secondary p-6 border-gray-medium">
          <div className="flex items-center mb-6">
            <CreditCard className="w-5 h-5 text-teal-primary mr-2" />
            <h3 className="text-lg font-semibold text-white" data-testid="connected-accounts-title">
              Connected Bank Accounts
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-lg border border-gray-medium">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium" data-testid="connected-bank-1">HDFC Bank - Savings Account</p>
                  <p className="text-gray-light text-sm">****1234 • Last synced: 2 hours ago</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-medium text-white hover:bg-dark-tertiary"
                data-testid="button-sync-account-1"
              >
                Sync Now
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-dark-tertiary rounded-lg border border-gray-medium">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium" data-testid="connected-bank-2">SBI - Current Account</p>
                  <p className="text-gray-light text-sm">****5678 • Last synced: 1 day ago</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-medium text-white hover:bg-dark-tertiary"
                data-testid="button-sync-account-2"
              >
                Sync Now
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-medium text-white hover:bg-dark-tertiary"
              data-testid="button-add-bank-account"
            >
              + Add Bank Account
            </Button>
          </div>
        </Card>

        {/* App Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center mb-6">
              <Bell className="w-5 h-5 text-teal-primary mr-2" />
              <h3 className="text-lg font-semibold text-white" data-testid="notification-settings-title">
                Notification Settings
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Transaction Alerts</p>
                  <p className="text-gray-light text-sm">Get notified for all transactions</p>
                </div>
                <Switch defaultChecked data-testid="switch-transaction-alerts" />
              </div>
              
              <Separator className="bg-gray-medium" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Expense Warnings</p>
                  <p className="text-gray-light text-sm">Alert when spending exceeds budget</p>
                </div>
                <Switch defaultChecked data-testid="switch-expense-warnings" />
              </div>
              
              <Separator className="bg-gray-medium" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Investment Opportunities</p>
                  <p className="text-gray-light text-sm">Notify about new bond/loan options</p>
                </div>
                <Switch defaultChecked data-testid="switch-investment-opportunities" />
              </div>
            </div>
          </Card>

          <Card className="bg-dark-secondary p-6 border-gray-medium">
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-teal-primary mr-2" />
              <h3 className="text-lg font-semibold text-white" data-testid="security-settings-title">
                Security Settings
              </h3>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-gray-medium text-white hover:bg-dark-tertiary justify-start"
                data-testid="button-change-password"
              >
                <Settings className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-medium text-white hover:bg-dark-tertiary justify-start"
                data-testid="button-enable-2fa"
              >
                <Shield className="w-4 h-4 mr-2" />
                Enable Two-Factor Authentication
              </Button>
              
              <Separator className="bg-gray-medium" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Biometric Login</p>
                  <p className="text-gray-light text-sm">Use fingerprint/face recognition</p>
                </div>
                <Switch data-testid="switch-biometric-login" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
