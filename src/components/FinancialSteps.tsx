import React from "react";
import { FinancialFormData, CalculationResults } from "./FinancialFormTypes";
import FinancialSteps1 from "./FinancialSteps1";
import FinancialSteps2 from "./FinancialSteps2";

interface FinancialStepsProps {
  currentStep: number;
  formData: FinancialFormData;
  calculationResults: CalculationResults | null;
  calculationComplete: boolean;
  reportGenerated: boolean;
  showConfetti: boolean;
  showFullReport: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRadioChange: (name: string, value: any) => void;
  handleGoalChange: (index: number, field: string, value: string) => void;
  addGoal: () => void;
  removeGoal: (index: number) => void;
  calculateInvestment: () => void;
  generateReport: () => void;
  resetCalculator: () => void;
  nextStep: () => void;
  viewFullReport: () => void;
}

const FinancialSteps: React.FC<FinancialStepsProps> = (props) => {
  // Redirect to the appropriate step component
  if (props.currentStep <= 4) {
    return (
      <FinancialSteps1
        currentStep={props.currentStep}
        formData={props.formData}
        handleInputChange={props.handleInputChange}
        handleRadioChange={props.handleRadioChange}
        handleGoalChange={props.handleGoalChange}
        addGoal={props.addGoal}
        removeGoal={props.removeGoal}
      />
    );
  } else {
    return (
      <FinancialSteps2
        currentStep={props.currentStep}
        formData={props.formData}
        calculationResults={props.calculationResults}
        calculationComplete={props.calculationComplete}
        reportGenerated={props.reportGenerated}
        showConfetti={props.showConfetti}
        showFullReport={props.showFullReport}
        handleInputChange={props.handleInputChange}
        handleRadioChange={props.handleRadioChange}
        calculateInvestment={props.calculateInvestment}
        generateReport={props.generateReport}
        resetCalculator={props.resetCalculator}
        viewFullReport={props.viewFullReport}
      />
    );
  }
};

export default FinancialSteps;
