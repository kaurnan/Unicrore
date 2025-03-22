export interface FinancialFormData {
  investmentType: string
  sipAmount: string
  lumpsumAmount: string
  hasEmergencyFund: boolean | null
  goals: Goal[]
  hasHealthInsurance: boolean | null
  hasLifeInsurance: boolean | null
  wantsTaxSaving: boolean | null
  wantsRetirement: boolean | null
  monthlyExpenses: string
  contactInfo: ContactInfo
}

export interface Goal {
  name: string
  timeFrame: string
  amount: string
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
}

export interface CalculationResults {
  totalInvestment: number
  projections: any
  goalProjections: GoalProjection[]
  retirementAmount: number
  portfolioAllocation: PortfolioAllocation
  recommendations: string[]
}

export interface GoalProjection {
  goalName: string
  timeFrame: number
  targetAmount: number
  projectedAmount: number
  shortfall: number
  achievementPercentage: number
}

export interface PortfolioAllocation {
  equity: number
  debt: number
  gold: number
  crypto: number
}

export const initialFormData: FinancialFormData = {
  investmentType: "",
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
}

export const isStepComplete = (step: number, formData: FinancialFormData): boolean => {
  switch (step) {
    case 1:
      return !!formData.investmentType
    case 2:
      if (formData.investmentType === "sip") {
        return !!formData.sipAmount
      } else if (formData.investmentType === "lumpsum") {
        return !!formData.lumpsumAmount
      } else if (formData.investmentType === "both") {
        return !!formData.sipAmount && !!formData.lumpsumAmount
      }
      return false
    case 3:
      return formData.hasEmergencyFund !== null
    case 4:
      return formData.goals.every((goal) => goal.name !== "" && goal.timeFrame !== "" && goal.amount !== "")
    case 5:
      return formData.hasHealthInsurance !== null && formData.hasLifeInsurance !== null
    case 6:
      if (formData.wantsRetirement === true) {
        return formData.wantsTaxSaving !== null && formData.wantsRetirement !== null && !!formData.monthlyExpenses
      }
      return formData.wantsTaxSaving !== null && formData.wantsRetirement !== null
    default:
      return true
  }
}

export const validateNumberInput = (value: string): boolean => {
  if (!value) return false
  const num = Number(value)
  return num >= 1 && num <= 100000000
}

