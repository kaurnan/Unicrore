"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { jsPDF } from "jspdf"
import AnimatedSection from "./AnimatedSection"
import { Calculator, ChevronRight, Download, ArrowRight, CheckCircle2, AlertCircle, IndianRupee, PieChart, LineChart, BarChart3, Sparkles, TrendingUp, Shield, Target, Wallet, Landmark, Coins, Zap, Rocket, Flame, Lightbulb } from 'lucide-react'
import Confetti from "./ui/Confetti"

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
  retirementAmount: string
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
  retirementAmount: "",
  contactInfo: {
    name: "",
    email: "",
    phone: "",
  },
}

const FinancialCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FinancialFormData>(initialFormData)
  const [calculationComplete, setCalculationComplete] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [calculationResults, setCalculationResults] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

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
    if (currentStep < 6) {
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
    const results: any = {}

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
  }

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  How Would You Like to Invest?
                </h3>
              </div>

              <div className="space-y-4">
                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    name="investmentType"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.investmentType === "sip"}
                    onChange={() => handleRadioChange("investmentType", "sip")}
                  />
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 mr-3 transition-colors ${formData.investmentType === "sip" ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.investmentType === "sip" && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block mb-1">SIP (Systematic Investment Plan)</span>
                      <span className="text-sm text-gray-600">
                        Invest a fixed amount every month - perfect for beginners and long-term wealth building
                      </span>
                    </div>
                    <div className="ml-4 bg-purple-100 p-2 rounded-lg">
                      <TrendingUp
                        className={`h-5 w-5 ${formData.investmentType === "sip" ? "text-purple-600" : "text-purple-400"}`}
                      />
                    </div>
                  </div>
                </label>

                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    name="investmentType"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.investmentType === "lumpsum"}
                    onChange={() => handleRadioChange("investmentType", "lumpsum")}
                  />
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 mr-3 transition-colors ${formData.investmentType === "lumpsum" ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.investmentType === "lumpsum" && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block mb-1">Lumpsum</span>
                      <span className="text-sm text-gray-600">
                        Invest a one-time amount - ideal when you have a large sum ready to invest
                      </span>
                    </div>
                    <div className="ml-4 bg-purple-100 p-2 rounded-lg">
                      <Coins
                        className={`h-5 w-5 ${formData.investmentType === "lumpsum" ? "text-purple-600" : "text-purple-400"}`}
                      />
                    </div>
                  </div>
                </label>

                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    name="investmentType"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.investmentType === "both"}
                    onChange={() => handleRadioChange("investmentType", "both")}
                  />
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 mr-3 transition-colors ${formData.investmentType === "both" ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.investmentType === "both" && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block mb-1">A mix of both</span>
                      <span className="text-sm text-gray-600">
                        Combine monthly SIP with a lumpsum investment - the power move for maximum growth
                      </span>
                    </div>
                    <div className="ml-4 bg-purple-100 p-2 rounded-lg">
                      <Sparkles
                        className={`h-5 w-5 ${formData.investmentType === "both" ? "text-purple-600" : "text-purple-400"}`}
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <IndianRupee className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  How Much Are You Comfortable Investing?
                </h3>
              </div>

              {(formData.investmentType === "sip" || formData.investmentType === "both") && (
                <div className="mb-6 bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <label htmlFor="sipAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    How much can you comfortably invest per month?
                  </label>
                  <div className="relative mt-1">
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
                </div>
              )}

              {(formData.investmentType === "lumpsum" || formData.investmentType === "both") && (
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <label htmlFor="lumpsumAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    What's the amount you have in mind for lumpsum investment?
                  </label>
                  <div className="relative mt-1">
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
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Do You Have an Emergency Fund?
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Financial experts recommend having 3-6 months of expenses saved as an emergency fund before investing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.hasEmergencyFund === true}
                    onChange={() => handleRadioChange("hasEmergencyFund", true)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasEmergencyFund === true ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.hasEmergencyFund === true && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Yes, I'm covered</span>
                    </div>
                    <div className="ml-4 bg-green-100 p-2 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </label>

                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.hasEmergencyFund === false}
                    onChange={() => handleRadioChange("hasEmergencyFund", false)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasEmergencyFund === false ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.hasEmergencyFund === false && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">No, I need to build one</span>
                    </div>
                    <div className="ml-4 bg-amber-100 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  What Are Your Financial Goals?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Add your financial goals and their details below. Having clear goals helps create a focused investment
                strategy.
              </p>

              <div className="space-y-6">
                {formData.goals.map((goal, index) => (
                  <div key={index} className="p-5 border border-purple-200 rounded-xl bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="font-semibold text-purple-600">{index + 1}</span>
                        </div>
                        <h4 className="font-medium text-gray-900">Goal {index + 1}</h4>
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

                    <div className="space-y-4">
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
                          <label
                            htmlFor={`goal-timeframe-${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
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
                          <label
                            htmlFor={`goal-amount-${index}`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
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
                    </div>
                  </div>
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
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Do You Have Financial Safety Nets?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Before investing, it's important to have proper insurance coverage to protect against unexpected events.
              </p>

              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <p className="text-gray-800 font-medium mb-3">Do you have health insurance?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative block p-3 border border-purple-100 rounded-lg transition-all hover:border-purple-300 cursor-pointer group">
                      <input
                        type="radio"
                        id="health-yes"
                        name="hasHealthInsurance"
                        className="absolute opacity-0 w-0 h-0"
                        checked={formData.hasHealthInsurance === true}
                        onChange={() => handleRadioChange("hasHealthInsurance", true)}
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasHealthInsurance === true ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                        >
                          {formData.hasHealthInsurance === true && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                        </div>
                        <span className="text-gray-800">Yes</span>
                      </div>
                    </label>

                    <label className="relative block p-3 border border-purple-100 rounded-lg transition-all hover:border-purple-300 cursor-pointer group">
                      <input
                        type="radio"
                        id="health-no"
                        name="hasHealthInsurance"
                        className="absolute opacity-0 w-0 h-0"
                        checked={formData.hasHealthInsurance === false}
                        onChange={() => handleRadioChange("hasHealthInsurance", false)}
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasHealthInsurance === false ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                        >
                          {formData.hasHealthInsurance === false && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                        </div>
                        <span className="text-gray-800">No</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <p className="text-gray-800 font-medium mb-3">Do you have life insurance (if you have dependents)?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative block p-3 border border-purple-100 rounded-lg transition-all hover:border-purple-300 cursor-pointer group">
                      <input
                        type="radio"
                        id="life-yes"
                        name="hasLifeInsurance"
                        className="absolute opacity-0 w-0 h-0"
                        checked={formData.hasLifeInsurance === true}
                        onChange={() => handleRadioChange("hasLifeInsurance", true)}
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasLifeInsurance === true ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                        >
                          {formData.hasLifeInsurance === true && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                        </div>
                        <span className="text-gray-800">Yes</span>
                      </div>
                    </label>

                    <label className="relative block p-3 border border-purple-100 rounded-lg transition-all hover:border-purple-300 cursor-pointer group">
                      <input
                        type="radio"
                        id="life-no"
                        name="hasLifeInsurance"
                        className="absolute opacity-0 w-0 h-0"
                        checked={formData.hasLifeInsurance === false}
                        onChange={() => handleRadioChange("hasLifeInsurance", false)}
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.hasLifeInsurance === false ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                        >
                          {formData.hasLifeInsurance === false && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                        </div>
                        <span className="text-gray-800">No</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Landmark className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Do You Want to Save on Taxes?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Tax-saving investments can help you reduce your tax liability while building wealth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    id="tax-yes"
                    name="wantsTaxSaving"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.wantsTaxSaving === true}
                    onChange={() => handleRadioChange("wantsTaxSaving", true)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsTaxSaving === true ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.wantsTaxSaving === true && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Yes, show me tax-saving options</span>
                      <span className="block text-xs text-gray-600 mt-1">(ELSS, PPF, NPS)</span>
                    </div>
                  </div>
                </label>

                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    id="tax-no"
                    name="wantsTaxSaving"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.wantsTaxSaving === false}
                    onChange={() => handleRadioChange("wantsTaxSaving", false)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsTaxSaving === false ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.wantsTaxSaving === false && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">No, taxes aren't a concern right now</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Are You Thinking About Retirement?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                It's never too early to start planning for retirement. The sooner you start, the more you'll have.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    id="retirement-yes"
                    name="wantsRetirement"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.wantsRetirement === true}
                    onChange={() => handleRadioChange("wantsRetirement", true)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsRetirement === true ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.wantsRetirement === true && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Yes, I want to build my retirement fund</span>
                    </div>
                  </div>
                </label>

                <label className="relative block p-4 bg-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
                  <input
                    type="radio"
                    id="retirement-no"
                    name="wantsRetirement"
                    className="absolute opacity-0 w-0 h-0"
                    checked={formData.wantsRetirement === false}
                    onChange={() => handleRadioChange("wantsRetirement", false)}
                  />
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3 transition-colors ${formData.wantsRetirement === false ? "bg-purple-600 border-purple-600" : "border-gray-300 group-hover:border-purple-400"}`}
                    >
                      {formData.wantsRetirement === false && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">No, I already have a plan in place</span>
                    </div>
                  </div>
                </label>
              </div>

              {formData.wantsRetirement && (
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                  <label htmlFor="retirementAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    How much do you estimate you'll need by retirement?
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-purple-500" />
                    </div>
                    <input
                      type="number"
                      name="retirementAmount"
                      id="retirementAmount"
                      className="block w-full pl-10 pr-12 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      placeholder="1,00,00,000"
                      value={formData.retirementAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>Most experts recommend saving at least 20-25 times your annual expenses</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Enter Your Contact Details
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                We'll use this information to prepare your personalized investment report.
              </p>

              <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
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
                    Email Address
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
                    Phone Number
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
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={calculateInvestment}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Investment Plan
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
                Your Personalized Investment Strategy
              </h3>
              <p className="text-gray-600 max-w-lg mx-auto">
                Based on your inputs, we've created a customized investment plan to help you achieve your financial
                goals.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-purple-100 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
                <h4 className="text-lg font-semibold">Investment Summary</h4>
              </div>
              <div className="p-5 space-y-3">
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
              </div>
            </div>

            <div className="bg-white rounded-xl border border-purple-100 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
                <h4 className="text-lg font-semibold">Goal-Based Projections</h4>
              </div>
              <div className="p-5 space-y-6">
                {calculationResults.goalProjections.map((goal: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-100"
                  >
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Target className="h-4 w-4 text-purple-600 mr-2" />
                      {goal.goalName}
                    </h5>

                    <div className="space-y-3">
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

                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress Towards Goal:</span>
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
              </div>
            </div>

            <div className="bg-white rounded-xl border border-purple-100 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
                <h4 className="text-lg font-semibold">Suggested Portfolio Allocation</h4>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100 text-center">
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.equity}%
                    </div>
                    <div className="text-sm text-gray-600">Equity</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-100 text-center">
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <LineChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.debt}%
                    </div>
                    <div className="text-sm text-gray-600">Debt</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100 text-center">
                    <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-2">
                      <PieChart className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.gold}%
                    </div>
                    <div className="text-sm text-gray-600">Gold</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100 text-center">
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {calculationResults.portfolioAllocation.crypto}%
                    </div>
                    <div className="text-sm text-gray-600">Crypto</div>
                  </div>
                </div>
              </div>
            </div>

            {calculationResults.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-purple-100 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
                  <h4 className="text-lg font-semibold">Recommendations</h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-3">
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
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="button"
                onClick={generateReport}
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Investment Report (PDF)
              </button>
            </div>
          </div>
        )

      case 6:
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
              Your investment report has been generated successfully. Our financial experts will contact you soon to
              discuss your investment strategy in detail.
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1)
                  setFormData(initialFormData)
                  setCalculationComplete(false)
                  setReportGenerated(false)
                }}
                className="inline-flex items-center px-6 py-3 border border-purple-300 rounded-xl shadow-sm text-base font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Start a New Calculation
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Progress indicator
  const renderProgress = () => {
    const steps = [
      { name: "Investment Details", number: 1, icon: Wallet },
      { name: "Financial Goals", number: 2, icon: Target },
      { name: "Financial Safety", number: 3, icon: Shield },
      { name: "Contact Details", number: 4, icon: Wallet },
      { name: "Results", number: 5, icon: PieChart },
    ]

    return (
      <div className="mb-10">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between w-full">
            {steps.map((step, stepIdx) => {
              const StepIcon = step.icon
              return (
                <li key={step.name} className={`relative flex flex-col items-center`}>
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute top-4 w-full left-0 right-0 flex items-center" aria-hidden="true">
                      <div
                        className={`h-0.5 w-full ${currentStep > step.number ? "bg-gradient-to-r from-purple-600 to-purple-800" : "bg-gray-200"}`}
                      />
                    </div>
                  ) : null}
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full z-10
                      ${
                        currentStep > step.number
                          ? "bg-gradient-to-r from-purple-600 to-purple-800 ring-2 ring-purple-100"
                          : currentStep === step.number
                            ? "bg-gradient-to-r from-purple-600 to-purple-800 ring-4 ring-purple-100"
                            : "bg-white border-2 border-gray-300"
                      }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${currentStep === step.number ? "text-white" : "text-gray-500"}`}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className={`text-xs font-medium ${currentStep === step.number ? "text-purple-600" : "text-gray-500"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    )
  }

  return (
    <section
      id="financial-calculator"
      className="py-12 md:py-24 bg-gradient-to-b from-purple-70 via-white to-purple-70 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-4">
            Financial Planning Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your financial future with our comprehensive investment calculator. Get a personalized strategy based
            on your goals and preferences.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-3xl mx-auto animate-fade-in-up" delay={200}>
          <div ref={formRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white flex items-center">
              <Calculator className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-bold">Investment Planning Questionnaire</h3>
            </div>

            <div className="p-6 md:p-8">
              {renderProgress()}

              <form onSubmit={(e) => e.preventDefault()}>
                {renderStep()}

                {currentStep === 1 && (
                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Next
                      <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                    </button>
                  </div>
                )}

                {currentStep > 1 && currentStep < 5 && (
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-6 py-3 border border-purple-300 rounded-xl shadow-sm text-base font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Next
                      <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-purple-600 flex items-center justify-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>Your information is secure and will only be used to provide you with investment advice.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default FinancialCalculator
