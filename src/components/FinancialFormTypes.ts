// Define types for our financial calculator
export interface FinancialFormData {
    investmentType: "sip" | "lumpsum" | "both";
    sipAmount: string;
    lumpsumAmount: string;
    hasEmergencyFund: boolean | null;
    goals: Array<{
      name: string;
      timeFrame: string;
      amount: string;
    }>;
    hasHealthInsurance: boolean | null;
    hasLifeInsurance: boolean | null;
    wantsTaxSaving: boolean | null;
    wantsRetirement: boolean | null;
    monthlyExpenses: string;
    contactInfo: {
      name: string;
      email: string;
      phone: string;
    };
  }
  
  // Initial form data
  export const initialFormData: FinancialFormData = {
    investmentType: "sip",
    sipAmount: "",
    lumpsumAmount: "",
    hasEmergencyFund: null,
    goals: [{ name: "", timeFrame: "", amount: "" }],
    hasHealthInsurance: null,
    hasLifeInsurance: null,
    wantsTaxSaving: null,
    wantsRetirement: null,
    monthlyExpenses: "",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  };
  
  // Define types for calculation results
  export interface CalculationResults {
    totalInvestment: number;
    projections: Record<string, any>;
    goalProjections: Array<{
      goalName: string;
      timeFrame: number;
      targetAmount: number;
      projectedAmount: number;
      shortfall: number;
      achievementPercentage: number;
    }>;
    retirementAmount: number;
    portfolioAllocation: {
      equity: number;
      debt: number;
      gold: number;
      crypto: number;
    };
    recommendations: string[];
  }
  
  // Define validation function to check if a form field is valid
  export const validateNumberInput = (value: string): boolean => {
    const numValue = Number(value);
    return numValue >= 1 && numValue <= 100000000;
  };
  
  // Helper function to check if a step is complete
  export const isStepComplete = (step: number, formData: FinancialFormData): boolean => {
    switch (step) {
      case 1: // Investment Type
        return true; // Investment type is always set with a default, so this step is always complete
      case 2: // Investment Amount
        if (formData.investmentType === "sip") {
          return validateNumberInput(formData.sipAmount);
        } else if (formData.investmentType === "lumpsum") {
          return validateNumberInput(formData.lumpsumAmount);
        } else if (formData.investmentType === "both") {
          return validateNumberInput(formData.sipAmount) && validateNumberInput(formData.lumpsumAmount);
        }
        return false;
      case 3: // Emergency Fund
        return formData.hasEmergencyFund !== null;
      case 4: // Financial Goals
        return formData.goals.every(
          (goal) => 
            goal.name.trim() !== "" && 
            validateNumberInput(goal.timeFrame) && 
            validateNumberInput(goal.amount)
        );
      case 5: // Insurance
        return formData.hasHealthInsurance !== null && formData.hasLifeInsurance !== null;
      case 6: // Tax & Retirement
        if (formData.wantsRetirement === true) {
          return formData.wantsTaxSaving !== null && validateNumberInput(formData.monthlyExpenses);
        }
        return formData.wantsTaxSaving !== null && formData.wantsRetirement !== null;
      default:
        return true;
    }
  };
  