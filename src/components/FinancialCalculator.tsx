"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { jsPDF } from "jspdf"
import AnimatedSection from "./AnimatedSection"
import {
  Calculator,
  ChevronRight,
  Download,
  ArrowRight,
  CheckCircle2,
  IndianRupee,
  Sparkles,
  TrendingUp,
  Target,
  Coins,
  ChevronLeft,
} from "lucide-react"
import Confetti from "./ui/Confetti"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FinancialCalculatorHook from "./FinancialCalculatorHook"

// Define types for our form data
interface FinancialFormData {
  investmentType: "sip" | "lumpsum" | "both"
  sipAmount: string
  lumpsumAmount: string
  hasEmergencyFund: boolean
  goals: Array<{
    name: string
    timeFrame: string
    amount: string
  }>
  hasHealthInsurance: boolean
  hasLifeInsurance: boolean
  wantsTaxSaving: boolean
  wantsRetirement: boolean
  monthlyExpenses: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

// Initial form data
const initialFormData: FinancialFormData = {
  investmentType: "sip",
  sipAmount: "",
  lumpsumAmount: "",
  hasEmergencyFund: false,
  goals: [{ name: "", timeFrame: "", amount: "" }],
  hasHealthInsurance: false,
  hasLifeInsurance: false,
  wantsTaxSaving: false,
  wantsRetirement: false,
  monthlyExpenses: "",
  contactInfo: {
    name: "",
    email: "",
    phone: "",
  },
}

const FinancialCalculator = () => {
  const [formData, setFormData] = useState<FinancialFormData>(initialFormData)
  const [calculationComplete, setCalculationComplete] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [calculationResults, setCalculationResults] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFullReport, setShowFullReport] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Current step state
  const [currentStep, setCurrentStep] = useState(1)
  // Update the totalSteps constant to reflect the number of steps
  const totalSteps = 9

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...((formData[parent as keyof FinancialFormData] as Record<string, any>) || {}),
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle radio button changes
  const handleRadioChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle goal changes
  const handleGoalChange = (index: number, field: string, value: string) => {
    const updatedGoals = [...formData.goals]
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      goals: updatedGoals,
    })
  }

  // Add a new goal
  const addGoal = () => {
    setFormData({
      ...formData,
      goals: [...formData.goals, { name: "", timeFrame: "", amount: "" }],
    })
  }

  // Remove a goal
  const removeGoal = (index: number) => {
    if (formData.goals.length > 1) {
      const updatedGoals = formData.goals.filter((_, i) => i !== index)
      setFormData({
        ...formData,
        goals: updatedGoals,
      })
    }
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Calculate investment projections
  const calculateInvestment = () => {
    // Perform calculations based on form data
    const results: any = {
      recommendations: [], // Initialize the recommendations array
    }

    // Get investment amounts
    const sipAmount = Number.parseFloat(formData.sipAmount) || 0
    const lumpsumAmount = Number.parseFloat(formData.lumpsumAmount) || 0

    // Calculate total investment
    results.totalInvestment =
      formData.investmentType === "sip"
        ? sipAmount
        : formData.investmentType === "lumpsum"
          ? lumpsumAmount
          : sipAmount + lumpsumAmount

    // Calculate projected returns (simplified for demo)
    // In a real application, this would use more complex financial formulas
    const avgAnnualReturn = 0.12 // 12% annual return assumption

    results.projections = {}

    // Calculate for each goal
    results.goalProjections = formData.goals.map((goal) => {
      const timeFrame = Number.parseInt(goal.timeFrame) || 1
      const targetAmount = Number.parseFloat(goal.amount) || 0

      let projectedAmount = 0

      if (formData.investmentType === "sip" || formData.investmentType === "both") {
        // SIP calculation: FV = P × ((1 + r)^n - 1) / r × (1 + r)
        // Where P is monthly investment, r is monthly rate, n is number of months
        const monthlyRate = avgAnnualReturn / 12
        const months = timeFrame * 12
        const monthlyInvestment = formData.investmentType === "both" ? sipAmount : sipAmount

        projectedAmount +=
          monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      }

      if (formData.investmentType === "lumpsum" || formData.investmentType === "both") {
        // Lumpsum calculation: FV = P(1 + r)^n
        // Where P is principal, r is annual rate, n is number of years
        const principal = formData.investmentType === "both" ? lumpsumAmount : lumpsumAmount

        projectedAmount += principal * Math.pow(1 + avgAnnualReturn, timeFrame)
      }

      const shortfall = targetAmount > projectedAmount ? targetAmount - projectedAmount : 0
      const achievementPercentage = Math.min(100, (projectedAmount / targetAmount) * 100 || 0)

      return {
        goalName: goal.name || `Goal ${formData.goals.indexOf(goal) + 1}`,
        timeFrame,
        targetAmount,
        projectedAmount: Math.round(projectedAmount),
        shortfall: Math.round(shortfall),
        achievementPercentage: Math.round(achievementPercentage),
      }
    })

    // Calculate retirement amount if retirement is wanted
    let retirementAmount = 0
    if (formData.wantsRetirement) {
      const monthlyExpenses = Number.parseFloat(formData.monthlyExpenses) || 0
      // Formula: Monthly expenses × 12 months × 25 years
      // This assumes 25 years of post-retirement life and no inflation adjustment
      retirementAmount = monthlyExpenses * 12 * 25

      // Add retirement as a recommendation with the calculated amount
      results.recommendations.push(
        `Build a retirement corpus of ₹${retirementAmount.toLocaleString("en-IN")} based on your current monthly expenses`,
      )
    }
    results.retirementAmount = retirementAmount

    // Portfolio allocation based on goals and risk profile
    results.portfolioAllocation = {
      equity: 60,
      debt: 25,
      gold: 10,
      crypto: 5,
    }

    // Recommendations based on inputs
    results.recommendations = []

    if (!formData.hasEmergencyFund) {
      results.recommendations.push("Build an emergency fund of 6 months' expenses before investing heavily")
    }

    if (!formData.hasHealthInsurance) {
      results.recommendations.push("Consider getting health insurance for financial protection")
    }

    if (!formData.hasLifeInsurance && formData.goals.length > 0) {
      results.recommendations.push("Secure life insurance to protect your financial goals")
    }

    if (formData.wantsTaxSaving) {
      results.recommendations.push("Allocate investments to ELSS funds, PPF, and NPS for tax benefits")
    }

    if (formData.wantsRetirement) {
      results.recommendations.push("Start a dedicated retirement fund with a mix of equity and debt")
    }

    setCalculationResults(results)
    setCalculationComplete(true)
    nextStep()
  }

  // Generate PDF report
  const generateReport = () => {
    // Check if contact info is filled
    if (!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone) {
      alert("Please fill in all contact details to download the report")
      return
    }

    const doc = new jsPDF()

    // Add logo and title
    doc.setFontSize(22)
    doc.setTextColor(124, 58, 237) // Purple color
    doc.text("Unicrore Financial Report", 105, 20, { align: "center" })

    // Add date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" })

    // Add client info
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`Prepared for: ${formData.contactInfo.name}`, 20, 45)
    doc.text(`Contact: ${formData.contactInfo.email} | ${formData.contactInfo.phone}`, 20, 55)

    // Add investment summary
    doc.setFontSize(16)
    doc.setTextColor(124, 58, 237) // Purple color
    doc.text("Investment Summary", 20, 75)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(
      `Investment Type: ${formData.investmentType === "sip" ? "SIP" : formData.investmentType === "lumpsum" ? "Lumpsum" : "SIP + Lumpsum"}`,
      20,
      85,
    )

    if (formData.investmentType === "sip" || formData.investmentType === "both") {
      doc.text(`Monthly SIP Amount: ₹${formData.sipAmount}`, 20, 95)
    }

    if (formData.investmentType === "lumpsum" || formData.investmentType === "both") {
      doc.text(`Lumpsum Investment: ₹${formData.lumpsumAmount}`, 20, formData.investmentType === "both" ? 105 : 95)
    }

    // Add goals and projections
    let yPos = formData.investmentType === "both" ? 120 : 110

    doc.setFontSize(16)
    doc.setTextColor(124, 58, 237) // Purple color
    doc.text("Goals & Projections", 20, yPos)
    yPos += 10

    calculationResults.goalProjections.forEach((goal: any, index: number) => {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`Goal ${index + 1}: ${goal.goalName}`, 20, yPos)
      yPos += 7
      doc.text(`Time Frame: ${goal.timeFrame} years`, 30, yPos)
      yPos += 7
      doc.text(`Target Amount: ₹${Number.parseInt(formData.goals[index].amount).toLocaleString("en-IN")}`, 30, yPos)
      yPos += 7
      doc.text(`Projected Amount: ₹${goal.projectedAmount.toLocaleString("en-IN")}`, 30, yPos)
      yPos += 7
      doc.text(`Achievement: ${goal.achievementPercentage}%`, 30, yPos)
      yPos += 12

      // Add a new page if we're running out of space
      if (yPos > 250 && index < calculationResults.goalProjections.length - 1) {
        doc.addPage()
        yPos = 20
      }
    })

    // Add retirement information if wanted
    if (formData.wantsRetirement) {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(16)
      doc.setTextColor(124, 58, 237) // Purple color
      doc.text("Retirement Planning", 20, yPos)
      yPos += 10

      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`Monthly Expenses: ₹${Number.parseInt(formData.monthlyExpenses).toLocaleString("en-IN")}`, 20, yPos)
      yPos += 7
      doc.text(`Required Retirement Corpus: ₹${calculationResults.retirementAmount.toLocaleString("en-IN")}`, 20, yPos)
      yPos += 12
    }

    // Add recommendations
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(16)
    doc.setTextColor(124, 58, 237) // Purple color
    doc.text("Recommendations", 20, yPos)
    yPos += 10

    calculationResults.recommendations.forEach((recommendation: string) => {
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`• ${recommendation}`, 20, yPos)
      yPos += 10
    })

    // Add portfolio allocation
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(16)
    doc.setTextColor(124, 58, 237) // Purple color
    doc.text("Suggested Portfolio Allocation", 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Equity: ${calculationResults.portfolioAllocation.equity}%`, 20, yPos)
    yPos += 7
    doc.text(`Debt: ${calculationResults.portfolioAllocation.debt}%`, 20, yPos)
    yPos += 7
    doc.text(`Gold: ${calculationResults.portfolioAllocation.gold}%`, 20, yPos)
    yPos += 7
    doc.text(`Crypto: ${calculationResults.portfolioAllocation.crypto}%`, 20, yPos)

    // Add footer
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("This is a projected estimate based on the information provided and assumed market returns.", 105, 280, {
      align: "center",
    })
    doc.text(
      "Actual returns may vary. Consult with a financial advisor before making investment decisions.",
      105,
      285,
      { align: "center" },
    )

    // Save the PDF
    doc.save(`Unicrore_Financial_Plan_${formData.contactInfo.name.replace(/\s+/g, "_")}.pdf`)
    setReportGenerated(true)
    setShowConfetti(true)
    setShowFullReport(true)
    nextStep()
  }

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // Progress indicator
  const renderProgressIndicator = () => {
    const stepNames = [
      "Investment Type",
      "Investment Amount",
      "Emergency Fund",
      "Financial Goals",
      "Insurance",
      "Tax & Retirement",
      "Investment Plan",
      "Contact Details",
      "Thank You",
    ]

    const progress = ((currentStep - 1) / (stepNames.length - 1)) * 100

    return (
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-purple-600">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-purple-800"
            ></div>
          </div>
          <div className="text-xs text-purple-600 text-center">
            Step {currentStep} of {stepNames.length}: {stepNames[currentStep - 1]}
          </div>
        </div>
      </div>
    )
  }

  // Render the investment type step with cards
  const renderInvestmentTypeStep = () => {
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
    ]

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
    )
  }

  // Render the investment amount step
  const renderInvestmentAmountStep = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Investment Amount
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(formData.investmentType === "sip" || formData.investmentType === "both") && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly SIP Amount</CardTitle>
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
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">/month</span>
                  </div>
                </div>
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
                <CardTitle className="text-lg">Lumpsum Amount</CardTitle>
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-2 flex items-center text-xs text-purple-600">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>A one-time investment can compound significantly over time!</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Render the emergency fund step
  const renderEmergencyFundStep = () => {
    const options = [
      {
        id: true,
        title: "Yes, I'm covered",
        // icon: CheckCircle2,
        iconClass: "text-green-600",
        bgClass: "bg-green-100",
      },
      {
        id: false,
        title: "No, I need to build one",
        // icon: AlertCircle,
        iconClass: "text-amber-600",
        bgClass: "bg-amber-100",
      },
    ]

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Do You Have an Emergency Fund?
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
                  {/* <div className={`ml-4 ${option.bgClass} p-2 rounded-lg`}>
                    <option.icon className={`h-5 w-5 ${option.iconClass}`} />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Render the financial goals step
  const renderFinancialGoalsStep = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          What Are Your Financial Goals?
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
                    Goal Description
                  </label>
                  <input
                    type="text"
                    id={`goal-name-${index}`}
                    className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Buy a house, Child's education, Travel"
                    value={goal.name}
                    onChange={(e) => handleGoalChange(index, "name", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`goal-timeframe-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Time Frame (Years)
                    </label>
                    <input
                      type="number"
                      id={`goal-timeframe-${index}`}
                      className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      placeholder="10"
                      value={goal.timeFrame}
                      onChange={(e) => handleGoalChange(index, "timeFrame", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor={`goal-amount-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Amount Needed (₹)
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
                        onChange={(e) => handleGoalChange(index, "amount", e.target.value)}
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
    )
  }

  // Render the insurance step (combining health and life insurance)
  const renderInsuranceStep = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Do You Have Health Insurance?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.hasHealthInsurance === true ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("hasHealthInsurance", true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasHealthInsurance === true ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.hasHealthInsurance === true && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Yes, I have health insurance</span>
                  </div>
                  {/* <div className="ml-4 bg-green-100 p-2 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.hasHealthInsurance === false ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("hasHealthInsurance", false)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasHealthInsurance === false ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.hasHealthInsurance === false && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">No, I don't have health insurance</span>
                  </div>
                  {/* <div className="ml-4 bg-amber-100 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Do You Have Life Insurance?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.hasLifeInsurance === true ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("hasLifeInsurance", true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasLifeInsurance === true ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.hasLifeInsurance === true && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Yes, I have life insurance</span>
                  </div>
                  {/* <div className="ml-4 bg-green-100 p-2 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.hasLifeInsurance === false ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("hasLifeInsurance", false)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasLifeInsurance === false ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.hasLifeInsurance === false && (
                      <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">No, I don't have life insurance</span>
                  </div>
                  {/* <div className="ml-4 bg-amber-100 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Render the tax and retirement step (combining tax saving and retirement)
  const renderTaxRetirementStep = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Do You Want to Save on Taxes?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.wantsTaxSaving === true ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("wantsTaxSaving", true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsTaxSaving === true ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.wantsTaxSaving === true && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Yes, show me tax-saving options</span>
                    <span className="block text-xs text-gray-600 mt-1">(ELSS, PPF, NPS)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.wantsTaxSaving === false ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("wantsTaxSaving", false)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsTaxSaving === false ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.wantsTaxSaving === false && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">No, taxes aren't a concern right now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Are You Thinking About Retirement?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.wantsRetirement === true ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("wantsRetirement", true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsRetirement === true ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.wantsRetirement === true && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">Yes, I want to build my retirement fund</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.wantsRetirement === false ? "border-purple-500 shadow-md" : "border-purple-100"
              }`}
              onClick={() => handleRadioChange("wantsRetirement", false)}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsRetirement === false ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}
                  >
                    {formData.wantsRetirement === false && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">No, I already have a plan in place</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {formData.wantsRetirement && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700 mb-2">
                    What are your current monthly expenses?
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-purple-500" />
                    </div>
                    <input
                      type="number"
                      name="monthlyExpenses"
                      id="monthlyExpenses"
                      className="block w-full pl-10 pr-12 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      placeholder="50,000"
                      value={formData.monthlyExpenses}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>This will help us calculate your retirement corpus requirement</span>
                  </div>
                </div>

                {formData.monthlyExpenses && Number.parseFloat(formData.monthlyExpenses) > 0 && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <p className="text-sm font-medium text-gray-700">Estimated Retirement Corpus Required:</p>
                    <p className="text-xl font-bold text-purple-700">
                      ₹{(Number.parseFloat(formData.monthlyExpenses) * 12 * 25).toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Based on your monthly expenses × 12 months × 25 years</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Render the contact details step
  const renderContactStep = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Enter Your Contact Details to Download
        </h3>

        <p className="text-gray-600 mb-4">
          Please provide your contact information to download your personalized investment report.
        </p>

        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="contactInfo.name"
                className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your name"
                value={formData.contactInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="contactInfo.email"
                className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your email"
                value={formData.contactInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="contactInfo.phone"
                className="block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your phone number"
                value={formData.contactInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <button
              type="button"
              onClick={generateReport}
              className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone}
            >
              <Download className="mr-2 h-5 w-5" />
              Download My Investment Plan
            </button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Render the results step
  const renderResultsStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div> */}
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
            Your Personalized Investment Strategy
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Based on your inputs, we've created a customized investment plan to help you achieve your financial goals.
          </p>
        </div>

        {/* Investment Summary - This part will be clear */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardTitle>Investment Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-700">Investment Type:</span>
              <span className="font-medium text-gray-900">
                {formData.investmentType === "sip"
                  ? "SIP (Monthly)"
                  : formData.investmentType === "lumpsum"
                    ? "Lumpsum"
                    : "SIP + Lumpsum"}
              </span>
            </div>

            {(formData.investmentType === "sip" || formData.investmentType === "both") && (
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-700">Monthly SIP Amount:</span>
                <span className="font-medium text-gray-900">
                  ₹{Number.parseInt(formData.sipAmount).toLocaleString("en-IN")}
                </span>
              </div>
            )}

            {(formData.investmentType === "lumpsum" || formData.investmentType === "both") && (
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-700">Lumpsum Investment:</span>
                <span className="font-medium text-gray-900">
                  ₹{Number.parseInt(formData.lumpsumAmount).toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blurred content with download button */}
        <div className="relative mt-6">
          {/* Blurred overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <p className="text-purple-800 font-medium mb-4 text-center px-4">
              Complete your details to access your full investment report
            </p>
            <button
              type="button"
              onClick={() => setCurrentStep(8)} // Skip to contact details (step 9)
              className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full Report
            </button>
          </div>

          {/* Blurred content */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-100 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.equity}%
                    </div>
                    <div className="text-sm text-gray-600">Equity</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-100 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.debt}%
                    </div>
                    <div className="text-sm text-gray-600">Debt</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.gold}%
                    </div>
                    <div className="text-sm text-gray-600">Gold</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100 text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.crypto}%
                    </div>
                    <div className="text-sm text-gray-600">Crypto</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                <CardTitle>Goal-Based Projections</CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {calculationResults.goalProjections.map((goal: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-100"
                  >
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Target className="h-4 w-4 text-purple-600 mr-2" />
                      {goal.goalName}
                    </h5>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time Frame:</span>
                        <span className="font-medium text-gray-900">{goal.timeFrame} years</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target Amount:</span>
                        <span className="font-medium text-gray-900">
                          ₹{Number.parseInt(formData.goals[index].amount).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Projected Amount:</span>
                        <span className="font-medium text-gray-900">
                          ₹{goal.projectedAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress:</span>
                          <span
                            className={
                              goal.achievementPercentage >= 100
                                ? "text-green-600 font-medium"
                                : "text-amber-600 font-medium"
                            }
                          >
                            {goal.achievementPercentage}%
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full ${goal.achievementPercentage >= 100 ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-amber-400 to-amber-500"}`}
                            style={{ width: `${Math.min(100, goal.achievementPercentage)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {calculationResults.recommendations.length > 0 && (
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {calculationResults.recommendations.map((recommendation: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-800">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render the summary step (before download)
  const renderSummaryStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white mb-4">
            <Download className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
            Your Investment Report is Ready
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Download your comprehensive investment report to see detailed projections and recommendations.
          </p>
        </div>

        <div className="relative">
          {/* Blurred overlay for the report */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <p className="text-purple-800 font-medium mb-4 text-center px-4">
              Your personalized investment report is ready to download
            </p>
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Full Report
            </button>
          </div>

          {/* Report preview */}
          <div className="bg-white rounded-xl border border-purple-200 shadow-lg p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-purple-100 pb-4">
              <div>
                <h4 className="text-xl font-bold text-purple-900">Unicrore Financial Report</h4>
                <p className="text-sm text-gray-500">Generated on: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Calculator className="h-6 w-6 text-purple-700" />
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-purple-800 mb-3">Investment Summary</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-600">Investment Type</p>
                  <p className="font-medium">
                    {formData.investmentType === "sip"
                      ? "SIP (Monthly)"
                      : formData.investmentType === "lumpsum"
                        ? "Lumpsum"
                        : "SIP + Lumpsum"}
                  </p>
                </div>

                {(formData.investmentType === "sip" || formData.investmentType === "both") && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600">Monthly SIP Amount</p>
                    <p className="font-medium">₹{Number.parseInt(formData.sipAmount).toLocaleString("en-IN")}</p>
                  </div>
                )}

                {(formData.investmentType === "lumpsum" || formData.investmentType === "both") && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600">Lumpsum Investment</p>
                    <p className="font-medium">₹{Number.parseInt(formData.lumpsumAmount).toLocaleString("en-IN")}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-purple-800 mb-3">Portfolio Allocation</h5>
              <div className="flex items-center space-x-2">
                <div
                  className="bg-purple-500 h-4 rounded-l-full"
                  style={{ width: `${calculationResults.portfolioAllocation.equity}%` }}
                ></div>
                <div
                  className="bg-blue-500 h-4"
                  style={{ width: `${calculationResults.portfolioAllocation.debt}%` }}
                ></div>
                <div
                  className="bg-amber-500 h-4"
                  style={{ width: `${calculationResults.portfolioAllocation.gold}%` }}
                ></div>
                <div
                  className="bg-cyan-500 h-4 rounded-r-full"
                  style={{ width: `${calculationResults.portfolioAllocation.crypto}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Equity {calculationResults.portfolioAllocation.equity}%</span>
                <span>Debt {calculationResults.portfolioAllocation.debt}%</span>
                <span>Gold {calculationResults.portfolioAllocation.gold}%</span>
                <span>Crypto {calculationResults.portfolioAllocation.crypto}%</span>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-purple-800 mb-3">Top Recommendations</h5>
              <ul className="space-y-2">
                {calculationResults.recommendations.slice(0, 2).map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{recommendation}</span>
                  </li>
                ))}
                {calculationResults.recommendations.length > 2 && (
                  <li className="text-purple-600 text-sm">
                    + {calculationResults.recommendations.length - 2} more recommendations in full report
                  </li>
                )}
              </ul>
            </div>

            <div className="border-t border-purple-100 pt-4 text-center text-sm text-gray-500">
              <p>Download the full report to see detailed projections and personalized recommendations.</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={nextStep}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Full Report
          </button>
        </div>
      </div>
    )
  }

  // Render the thank you step
  const renderThankYouStep = () => {
    return (
      <div className="text-center space-y-6">
        {showConfetti && <Confetti />}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white mb-6">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Thank You!
        </h3>

        <p className="text-gray-600 max-w-md mx-auto">
          Your investment report has been generated successfully. Our financial experts will contact you soon to discuss
          your investment strategy in detail.
        </p>

        <div className="pt-6">
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1)
              setFormData(initialFormData)
              setCalculationComplete(false)
              setReportGenerated(false)
              setShowFullReport(false)
              setShowCalculator(false)
            }}
            className="inline-flex items-center px-6 py-3 border border-purple-300 rounded-xl shadow-sm text-base font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Start a New Calculation
          </button>
        </div>
      </div>
    )
  }

  // Render the appropriate step based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderInvestmentTypeStep()
      case 2:
        return renderInvestmentAmountStep()
      case 3:
        return renderEmergencyFundStep()
      case 4:
        return renderFinancialGoalsStep()
      case 5:
        return renderInsuranceStep()
      case 6:
        return renderTaxRetirementStep()
      case 7:
        return renderResultsStep()
      case 8: // This is now the contact step (previously 9)
        return renderContactStep()
      case 9: // This is now the thank you step (previously 10)
        return renderThankYouStep()
      default:
        return null
    }
  }

  return (
    <section
      id="financial-calculator"
      className="bg-gradient-to-b from-purple-70 via-white to-purple-70 min-h-screen flex items-center"
    >
      <main className="flex-grow">
        {!showCalculator ? (
          <FinancialCalculatorHook onStart={() => setShowCalculator(true)} />
        ) : (
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
                Financial Planning Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Plan your financial future with our comprehensive investment calculator. Get a personalized strategy
                based on your goals and preferences.
              </p>
            </AnimatedSection>

            <AnimatedSection className="max-w-6xl mx-auto animate-fade-in-up" delay={200}>
              <div ref={formRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white flex items-center">
                  <Calculator className="h-6 w-6 mr-3" />
                  <h3 className="text-xl font-bold">Investment Planning Questionnaire</h3>
                </div>

                <div className="p-6 md:p-8">
                  {renderProgressIndicator()}

                  <form onSubmit={(e) => e.preventDefault()}>
                    {renderStep()}

                    {currentStep < 7 && (
                      <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="inline-flex items-center px-6 py-3 border border-purple-300 rounded-xl shadow-sm text-base font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                          >
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            Back
                          </button>
                        )}

                        {currentStep === 1 && (
                          <div></div> // Empty div for flex spacing when there's no back button
                        )}

                        {currentStep !== 7 && (
                          <button
                            type="button"
                            onClick={currentStep === 6 ? calculateInvestment : nextStep}
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
                          >
                            Next
                            <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-purple-600 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                <p>Your information is secure and will only be used to provide you with investment advice.</p>
              </div>
            </AnimatedSection>
          </div>
        )}
      </main>
    </section>
  )
}

export default FinancialCalculator

