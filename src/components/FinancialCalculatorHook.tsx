"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { type FinancialFormData, initialFormData, isStepComplete, type CalculationResults } from "./FinancialFormTypes"
import { calculateInvestmentProjections, generateInvestmentPDF } from "./CalculationUtils"

export const useFinancialCalculator = () => {
  const [formData, setFormData] = useState<FinancialFormData>(initialFormData)
  const [calculationComplete, setCalculationComplete] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFullReport, setShowFullReport] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [contactDetailsSubmitted, setContactDetailsSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  // Total steps in the calculator (now 9 steps total with the new full report step)
  const totalSteps = 9

  // Check local storage for contact details on initial load
  useEffect(() => {
    const storedContactDetails = localStorage.getItem("financialContactDetails")
    if (storedContactDetails) {
      try {
        const contactInfo = JSON.parse(storedContactDetails)
        setFormData((prev) => ({
          ...prev,
          contactInfo,
        }))
        setContactDetailsSubmitted(true)
      } catch (e) {
        console.error("Error parsing stored contact details", e)
      }
    }
  }, [])

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
      if (isStepComplete(currentStep, formData)) {
        setCurrentStep(currentStep + 1)
      } else {
        // Alert user to complete all fields
        alert("Please complete all required fields before proceeding.")
      }
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Calculate investment projections
  const calculateInvestment = () => {
    if (isStepComplete(currentStep, formData)) {
      const results = calculateInvestmentProjections(formData)
      setCalculationResults(results)
      setCalculationComplete(true)
      nextStep()
    } else {
      // Alert user to complete all fields
      alert("Please complete all required fields before generating your report.")
    }
  }

  // Generate PDF report
  const generateReport = () => {
    // Check if contact info is filled
    if (!formData.contactInfo.name || !formData.contactInfo.email || !formData.contactInfo.phone) {
      alert("Please fill in all contact details to download the report");
      return;
    }

    if (calculationResults) {
      // Call generateInvestmentPDF and check its return value
      const pdfGenerated = generateInvestmentPDF(formData, calculationResults);
    
      // Only proceed if PDF generation was successful
      if (pdfGenerated) {
        setReportGenerated(true);
        setShowConfetti(true);
        setShowFullReport(true);
        setCurrentStep(8); // Move to thank you step

        // Store contact details in local storage
        localStorage.setItem("financialContactDetails", JSON.stringify(formData.contactInfo));
        setContactDetailsSubmitted(true);
      }
    }
  }

  // View the full report (navigates to step 9)
  const viewFullReport = () => {
    setShowFullReport(true)
    setCurrentStep(9) // Navigate to the full report step
  }

  // Reset calculator to initial state
  const resetCalculator = () => {
    setCurrentStep(1)
    setFormData({
      ...initialFormData,
      contactInfo: contactDetailsSubmitted ? formData.contactInfo : initialFormData.contactInfo,
    })
    setCalculationComplete(false)
    setReportGenerated(false)
    setShowFullReport(false)
  }

  // Progress indicator percentage
  const getProgressPercentage = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100
  }

  // Get current step name
  const getCurrentStepName = () => {
    const stepNames = [
      "Investment Type",
      "Investment Amount",
      "Emergency Fund",
      "Financial Goals",
      "Insurance",
      "Tax & Retirement",
      "Investment Plan",
      "Thank You",
      "Full Report",
    ]
    return stepNames[currentStep - 1] || ""
  }

  // Manage confetti display time
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  return {
    formData,
    calculationComplete,
    reportGenerated,
    calculationResults,
    showConfetti,
    showFullReport,
    showCalculator,
    currentStep,
    totalSteps,
    formRef,
    contactDetailsSubmitted,
    handleInputChange,
    handleRadioChange,
    handleGoalChange,
    addGoal,
    removeGoal,
    nextStep,
    prevStep,
    calculateInvestment,
    generateReport,
    resetCalculator,
    setShowCalculator,
    getProgressPercentage,
    getCurrentStepName,
    setDownloadModalOpen,
    viewFullReport,
  }
}
