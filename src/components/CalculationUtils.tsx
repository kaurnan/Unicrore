import { jsPDF } from "jspdf"
import type { FinancialFormData, CalculationResults } from "./FinancialFormTypes"

// Add email validation function at the top of the file
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

// Calculate investment projections based on form data
export const calculateInvestmentProjections = (formData: FinancialFormData): CalculationResults => {
  // Perform calculations based on form data
  const results: Partial<CalculationResults> = {
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

      projectedAmount += monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
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
    results.recommendations?.push(
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
  if (!formData.hasEmergencyFund) {
    results.recommendations?.push("Build an emergency fund of 6 months' expenses before investing heavily")
  }

  if (!formData.hasHealthInsurance) {
    results.recommendations?.push("Consider getting health insurance for financial protection")
  }

  if (!formData.hasLifeInsurance && formData.goals.length > 0) {
    results.recommendations?.push("Secure life insurance to protect your financial goals")
  }

  if (formData.wantsTaxSaving) {
    results.recommendations?.push("Allocate investments to ELSS funds, PPF, and NPS for tax benefits")
  }

  if (formData.wantsRetirement) {
    results.recommendations?.push("Start a dedicated retirement fund with a mix of equity and debt")
  }

  return results as CalculationResults
}

// Update the generateInvestmentPDF function to validate email before generating PDF
export const generateInvestmentPDF = (formData: FinancialFormData, calculationResults: CalculationResults): boolean => {
  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(formData.contactInfo.email)) {
    alert("Please enter a valid email address");
    return false;
  }

  const doc = new jsPDF();
  
  // Rest of the function remains the same...
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
    `Investment Type: ${
      formData.investmentType === "sip" ? "SIP" : formData.investmentType === "lumpsum" ? "Lumpsum" : "SIP + Lumpsum"
    }`,
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
  doc.text("Actual returns may vary. Consult with a financial advisor before making investment decisions.", 105, 285, {
    align: "center",
  })

  // Save the PDF
  doc.save(`Unicrore_Financial_Plan_${formData.contactInfo.name.replace(/\s+/g, "_")}.pdf`);
  
  return true;
}
