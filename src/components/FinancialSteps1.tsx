import React , {useEffect} from "react";
import { FinancialFormData, validateNumberInput } from "./FinancialFormTypes";
import { TrendingUp, Coins, Sparkles, IndianRupee, Target } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FinancialSteps1Props {
  currentStep: number;
  formData: FinancialFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRadioChange: (name: string, value: any) => void;
  handleGoalChange: (index: number, field: string, value: string) => void;
  addGoal: () => void;
  removeGoal: (index: number) => void;
}

const FinancialSteps1: React.FC<FinancialSteps1Props> = ({
  currentStep,
  formData,
  handleInputChange,
  handleRadioChange,
  handleGoalChange,
  addGoal,
  removeGoal
}) => {
  // Global wheel event handler for number inputs
  useEffect(() => {
    // Function to prevent wheel scrolling on number inputs
    const preventScroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'number') {
        // Instead of preventDefault, blur the input to lose focus
        target.blur();
      }
    };

    // Add the event listener to the document
    document.addEventListener('wheel', preventScroll);

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener('wheel', preventScroll);
    };
  }, []);

  // Return the current step content based on currentStep
  switch (currentStep) {
    case 1:
      return renderInvestmentTypeStep(formData, handleRadioChange);
    case 2:
      return renderInvestmentAmountStep(formData, handleInputChange);
    case 3:
      return renderEmergencyFundStep(formData, handleRadioChange);
    case 4:
      return renderFinancialGoalsStep(formData, handleGoalChange, addGoal, removeGoal);
    default:
      return null;
  }
};

// Render the investment type step with cards
const renderInvestmentTypeStep = (
  formData: FinancialFormData,
  handleRadioChange: (name: string, value: any) => void
) => {
  const options = [
    {
      id: "sip",
      title: "SIP (Systematic Investment Plan)",
      description: "Invest a fixed amount every month - perfect for beginners and long-term wealth building",
      icon: TrendingUp,
    },
    {
      id: "lumpsum",
      title: "Lumpsum",
      description: "Invest a one-time amount - ideal when you have a large sum ready to invest",
      icon: Coins,
    },
    {
      id: "both",
      title: "A mix of both",
      description: "Combine monthly SIP with a lumpsum investment - the power move for maximum growth",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
        How Would You Like to Invest?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              formData.investmentType === option.id ? "border-purple-500 shadow-md" : "border-purple-100"
            }`}
            onClick={() => handleRadioChange("investmentType", option.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData.investmentType === option.id ? "bg-purple-600 border-purple-600" : "border-gray-300"
                  }`}
                >
                  {formData.investmentType === option.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <option.icon
                    className={`h-5 w-5 ${formData.investmentType === option.id ? "text-purple-600" : "text-purple-400"}`}
                  />
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Render the investment amount step
const renderInvestmentAmountStep = (
  formData: FinancialFormData,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
) => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 1 && Number(value) <= 100000000)) {
      handleInputChange(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
        Investment Amount
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(formData.investmentType === "sip" || formData.investmentType === "both") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly SIP Amount <span className="text-red-500">*</span></CardTitle>
              <CardDescription>How much can you comfortably invest per month?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  type="number"
                  name="sipAmount"
                  id="sipAmount"
                  className="block w-full pl-10 pr-20 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="5,000"
                  value={formData.sipAmount}
                  onChange={handleNumberInput}
                  min={1}
                  max={100000000}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">/month</span>
                </div>
              </div>
              {formData.sipAmount && !validateNumberInput(formData.sipAmount) && (
                <div className="mt-1 text-xs text-red-600">
                  Amount must be between 1 and 100,000,000
                </div>
              )}
              <div className="mt-2 flex items-center text-xs text-purple-600">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>Even ₹500 per month can grow to ₹1 lakh in 10 years!</span>
              </div>
            </CardContent>
          </Card>
        )}

        {(formData.investmentType === "lumpsum" || formData.investmentType === "both") && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lumpsum Amount <span className="text-red-500">*</span></CardTitle>
              <CardDescription>What's the amount you have in mind for lumpsum investment?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  type="number"
                  name="lumpsumAmount"
                  id="lumpsumAmount"
                  className="block w-full pl-10 pr-12 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white"
                  placeholder="100,000"
                  value={formData.lumpsumAmount}
                  onChange={handleNumberInput}
                  min={1}
                  max={100000000}
                  required
                />
              </div>
              {formData.lumpsumAmount && !validateNumberInput(formData.lumpsumAmount) && (
                <div className="mt-1 text-xs text-red-600">
                  Amount must be between 1 and 100,000,000
                </div>
              )}
              <div className="mt-2 flex items-center text-xs text-purple-600">
                <Sparkles className="h-3 w-3 mr-1" />
                <span>A one-time investment can compound significantly over time!</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Render the emergency fund step
const renderEmergencyFundStep = (
  formData: FinancialFormData,
  handleRadioChange: (name: string, value: any) => void
) => {
  const options = [
    {
      id: true,
      title: "Yes, I'm covered",
      iconClass: "text-green-600",
      bgClass: "bg-green-100",
    },
    {
      id: false,
      title: "No, I need to build one",
      iconClass: "text-amber-600",
      bgClass: "bg-amber-100",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
        Do You Have an Emergency Fund? <span className="text-red-500">*</span>
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Financial experts recommend having 3-6 months of expenses saved as an emergency fund before investing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <Card
            key={String(option.id)}
            className={`cursor-pointer transition-all hover:shadow-md ${
              formData.hasEmergencyFund === option.id ? "border-purple-500 shadow-md" : "border-purple-100"
            }`}
            onClick={() => handleRadioChange("hasEmergencyFund", option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasEmergencyFund === option.id ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                >
                  {formData.hasEmergencyFund === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{option.title}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Render the financial goals step
const renderFinancialGoalsStep = (
  formData: FinancialFormData,
  handleGoalChange: (index: number, field: string, value: string) => void,
  addGoal: () => void,
  removeGoal: (index: number) => void
) => {
  const handleNumberInput = (index: number, field: string, value: string) => {
    if (field === "timeFrame" || field === "amount") {
      if (value === "" || (Number(value) >= 1 && Number(value) <= 100000000)) {
        handleGoalChange(index, field, value);
      }
    } else {
      handleGoalChange(index, field, value);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
        What Are Your Financial Goals? <span className="text-red-500">*</span>
      </h3>

      <p className="text-gray-600 mb-4">
        Add your financial goals and their details below. Having clear goals helps create a focused investment
        strategy.
      </p>

      <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto pr-2">
        {formData.goals.map((goal, index) => (
          <Card key={index} className="border border-purple-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="font-semibold text-purple-600">{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg">Goal {index + 1}</CardTitle>
                </div>
                {formData.goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(index)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center"
                  >
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor={`goal-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`goal-name-${index}`}
                  className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Buy a house, Child's education, Travel"
                  value={goal.name}
                  onChange={(e) => handleGoalChange(index, "name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`goal-timeframe-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Time Frame (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id={`goal-timeframe-${index}`}
                    className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    placeholder="10"
                    value={goal.timeFrame}
                    onChange={(e) => handleNumberInput(index, "timeFrame", e.target.value)}
                    min={1}
                    max={100000000}
                    required
                  />
                </div>

                <div>
                  <label htmlFor={`goal-amount-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Amount Needed (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-purple-500" />
                    </div>
                    <input
                      type="number"
                      id={`goal-amount-${index}`}
                      className="block w-full pl-10 pr-12 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      placeholder="1,00,00,000"
                      value={goal.amount}
                      onChange={(e) => handleNumberInput(index, "amount", e.target.value)}
                      min={1}
                      max={100000000}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          type="button"
          onClick={addGoal}
          className="inline-flex items-center px-5 py-3 border border-purple-300 rounded-lg shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          <span className="mr-2">+</span> Add Another Goal
        </button>
      </div>
    </div>
  );
};

export default FinancialSteps1;
