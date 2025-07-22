import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Target,
  PieChart
} from 'lucide-react';

interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
  items: { name: string; price: number; }[];
}

interface BudgetCalculatorProps {
  totalBudget: number;
  budgetItems: BudgetItem[];
  className?: string;
  onOptimize?: () => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  totalBudget,
  budgetItems,
  className,
  onOptimize
}) => {
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const remaining = totalBudget - totalSpent;
  const overBudget = totalSpent > totalBudget;
  const utilizationRate = (totalSpent / totalBudget) * 100;

  const getStatusColor = (spent: number, allocated: number) => {
    const ratio = spent / allocated;
    if (ratio > 1) return 'text-destructive';
    if (ratio > 0.8) return 'text-accent-amber';
    return 'text-accent-teal';
  };

  const getStatusIcon = (spent: number, allocated: number) => {
    const ratio = spent / allocated;
    if (ratio > 1) return <AlertTriangle className="w-4 h-4" />;
    if (ratio > 0.8) return <TrendingUp className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Budget Overview */}
      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Target className="w-5 h-5" />
            <span>Budget Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Spent</span>
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "font-bold",
                  overBudget ? "text-destructive" : "text-primary"
                )}>
                  ₹{totalSpent.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-muted-foreground">
                  / ₹{totalBudget.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <Progress 
              value={Math.min(utilizationRate, 100)} 
              className={cn(
                "h-2",
                overBudget && "[&>div]:bg-destructive"
              )}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {utilizationRate.toFixed(1)}% utilized
              </span>
              <div className={cn(
                "flex items-center space-x-1",
                remaining < 0 ? "text-destructive" : "text-accent-teal"
              )}>
                {remaining < 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {remaining < 0 ? 'Over by ' : 'Remaining '}
                  ₹{Math.abs(remaining).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {budgetItems.length}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent-teal">
                {budgetItems.reduce((sum, item) => sum + item.items.length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Items</div>
            </div>
            <div className="text-center">
              <div className={cn(
                "text-lg font-bold",
                overBudget ? "text-destructive" : "text-accent-amber"
              )}>
                {((totalSpent / totalAllocated) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <PieChart className="w-5 h-5" />
            <span>Category Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {budgetItems.map((item, index) => {
            const utilizationPercent = (item.spent / item.allocated) * 100;
            const overAllocated = item.spent > item.allocated;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={getStatusColor(item.spent, item.allocated)}>
                      {getStatusIcon(item.spent, item.allocated)}
                    </span>
                    <span className="font-medium text-sm">{item.category}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.items.length} items
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ₹{item.spent.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      of ₹{item.allocated.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                
                <Progress 
                  value={Math.min(utilizationPercent, 100)} 
                  className={cn(
                    "h-1.5",
                    overAllocated && "[&>div]:bg-destructive"
                  )}
                />
                
                {overAllocated && (
                  <div className="text-xs text-destructive flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>
                      Over by ₹{(item.spent - item.allocated).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      {(overBudget || utilizationRate > 80) && (
        <Card className="shadow-soft border-accent-amber">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground mb-1">
                  Budget Optimization Suggested
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {overBudget 
                    ? 'You\'re over budget. Consider cheaper alternatives or removing some items.'
                    : 'You\'re close to budget limit. Review upcoming purchases.'
                  }
                </p>
                <Button size="sm" variant="outline" onClick={onOptimize}>
                  <DollarSign className="w-3 h-3 mr-1" />
                  Optimize Budget
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};