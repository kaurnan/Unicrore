"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { type FinancialFormData, validateNumberInput, type CalculationResults } from "./FinancialFormTypes"
import {
  Sparkles,
  IndianRupee,
  CheckCircle2,
  Download,
  Target,
  Eye,
  FileDown,
  ArrowRight,
  Gift,
  Share2,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FinancialSteps2Props {
  currentStep: number
  formData: FinancialFormData
  calculationResults: CalculationResults | null
  calculationComplete: boolean
  reportGenerated: boolean
  showConfetti: boolean
  showFullReport: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleRadioChange: (name: string, value: any) => void
  calculateInvestment: () => void
  generateReport: () => void
  resetCalculator: () => void
  viewFullReport: () => void
}

// Replace the ContactModal component with this fixed version
const ContactModal = ({
  formData,
  handleInputChange,
  generateReport,
  isOpen,
  setIsOpen,
}: {
  formData: FinancialFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  generateReport: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const [emailError, setEmailError] = useState("")

  const validateEmailInput = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError("Please enter a valid email address")
      return false
    } else {
      setEmailError("")
      return email.length > 0 // Return true only if email is not empty
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    validateEmailInput(e.target.value)
  }

  // Don't call validateEmailInput during render
  const isFormValid = formData.contactInfo.name && formData.contactInfo.email && formData.contactInfo.phone

  const handleSubmit = () => {
    // Validate email before submitting
    if (formData.contactInfo.email && validateEmailInput(formData.contactInfo.email)) {
      generateReport()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Your Contact Details</DialogTitle>
          <DialogDescription>
            Please provide your contact information to download your personalized investment report.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
              className={`block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${emailError ? "border-red-500" : ""}`}
              placeholder="Your email"
              value={formData.contactInfo.email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Replace the DownloadModal component with this fixed version
const DownloadModal = ({
  formData,
  handleInputChange,
  generateReport,
  isOpen,
  setIsOpen,
}: {
  formData: FinancialFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  generateReport: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const [emailError, setEmailError] = useState("")

  const validateEmailInput = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError("Please enter a valid email address")
      return false
    } else {
      setEmailError("")
      return email.length > 0 // Return true only if email is not empty
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    validateEmailInput(e.target.value)
  }

  // Don't call validateEmailInput during render
  const isFormValid = formData.contactInfo.name && formData.contactInfo.email && formData.contactInfo.phone

  const handleSubmit = () => {
    // Validate email before submitting
    if (formData.contactInfo.email && validateEmailInput(formData.contactInfo.email)) {
      generateReport()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Your Report</DialogTitle>
          <DialogDescription>To proceed with the download, please confirm your contact details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
              className={`block w-full px-4 py-3 border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 ${emailError ? "border-red-500" : ""}`}
              placeholder="Your email"
              value={formData.contactInfo.email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const FinancialSteps2: React.FC<FinancialSteps2Props> = ({
  currentStep,
  formData,
  calculationResults,
  calculationComplete,
  reportGenerated,
  showConfetti,
  showFullReport,
  handleInputChange,
  handleRadioChange,
  calculateInvestment,
  generateReport,
  resetCalculator,
  viewFullReport,
}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  useEffect(() => {
    // Function to prevent wheel scrolling on number inputs
    const preventScroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" && (target as HTMLInputElement).type === "number") {
        // Instead of preventDefault, blur the input to lose focus
        target.blur()
      }
    }

    // Add the event listener to the document
    document.addEventListener("wheel", preventScroll)

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener("wheel", preventScroll)
    }
  }, [])

  // Return the current step content based on currentStep
  switch (currentStep) {
    case 5:
      return renderInsuranceStep(formData, handleRadioChange)
    case 6:
      return renderTaxRetirementStep(formData, handleRadioChange, handleInputChange, calculateInvestment)
    case 7:
      return (
        <>
          {renderResultsStep(
            formData,
            calculationResults,
            showFullReport,
            generateReport,
            setContactModalOpen,
            setDownloadModalOpen,
          )}
          <ContactModal
            formData={formData}
            handleInputChange={handleInputChange}
            generateReport={generateReport}
            isOpen={contactModalOpen}
            setIsOpen={setContactModalOpen}
          />
          <DownloadModal
            formData={formData}
            handleInputChange={handleInputChange}
            generateReport={generateReport}
            isOpen={downloadModalOpen}
            setIsOpen={setDownloadModalOpen}
          />
        </>
      )
    case 8:
      return renderThankYouStep(resetCalculator, showConfetti, viewFullReport)
    case 9:
      return renderFullReportStep(formData, calculationResults, resetCalculator)
    default:
      return null
  }
}

// Render the insurance step (combining health and life insurance)
const renderInsuranceStep = (formData: FinancialFormData, handleRadioChange: (name: string, value: any) => void) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Do You Have Health Insurance? <span className="text-red-500">*</span>
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
                  {formData.hasHealthInsurance === true && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Yes, I have health insurance</span>
                </div>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Do You Have Life Insurance? <span className="text-red-500">*</span>
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
                  {formData.hasLifeInsurance === false && <div className="w-2 h-2 bg-white rounded-full m-auto"></div>}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900">No, I don't have life insurance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Render the tax and retirement step (combining tax saving and retirement)
const renderTaxRetirementStep = (
  formData: FinancialFormData,
  handleRadioChange: (name: string, value: any) => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  calculateInvestment: () => void,
) => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (Number(value) >= 1 && Number(value) <= 100000000)) {
      handleInputChange(e)
    }
  }

  const isFormValid = () => {
    if (formData.wantsTaxSaving === null || formData.wantsRetirement === null) {
      return false
    }

    if (formData.wantsRetirement === true && !validateNumberInput(formData.monthlyExpenses)) {
      return false
    }

    return true
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Do You Want to Save on Taxes? <span className="text-red-500">*</span>
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
          Are You Thinking About Retirement? <span className="text-red-500">*</span>
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
                  What are your current monthly expenses? <span className="text-red-500">*</span>
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
                    onChange={handleNumberInput}
                    min={1}
                    max={100000000}
                    onWheel={(e) => e.preventDefault()}
                    required
                  />
                </div>
                {formData.monthlyExpenses && !validateNumberInput(formData.monthlyExpenses) && (
                  <div className="mt-1 text-xs text-red-600">Amount must be between 1 and 100,000,000</div>
                )}
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

      <div className="mt-8">
        <button
          type="button"
          onClick={calculateInvestment}
          disabled={!isFormValid()}
          className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Report
        </button>
        {!isFormValid() && (
          <p className="text-center text-sm text-red-500 mt-2">
            Please complete all required fields before generating your report
          </p>
        )}
      </div>
    </div>
  )
}

// Render the results step
const renderResultsStep = (
  formData: FinancialFormData,
  calculationResults: CalculationResults | null,
  showFullReport: boolean,
  generateReport: () => void,
  setContactModalOpen: (open: boolean) => void,
  setDownloadModalOpen: (open: boolean) => void,
) => {
  if (!calculationResults) return null

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
          Your Personalized Investment Strategy
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto">
          Based on your inputs, we've created a customized investment plan to help you achieve your financial goals.
        </p>
        <Button
          onClick={() => setContactModalOpen(true)}
          className="mt-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
        >
          <Eye className="mr-2 h-5 w-5" />
          View Full Report
        </Button>
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
              <span className="text-gray-700">Monthly SIP Investment:</span>
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

          {/* Blurred content */}
          <div className={`mt-4 ${showFullReport ? "" : "blur-sm relative"}`}>
            {!showFullReport && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Button
                  onClick={() => setDownloadModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                >
                  <FileDown className="mr-2 h-5 w-5" />
                  Download Detailed Report
                </Button>
              </div>
            )}

            {calculationResults.goalProjections && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Goal Projections</h4>
                <div className="space-y-4">
                  {calculationResults.goalProjections.map((goal, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                          <Target className="h-3 w-3 text-purple-600" />
                        </div>
                        <h5 className="font-medium text-gray-900">{goal.goalName}</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Time Frame:</span>
                          <span className="font-medium">{goal.timeFrame} years</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Target Amount:</span>
                          <span className="font-medium">
                            ₹{Number.parseInt(formData.goals[index].amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Projected Amount:</span>
                          <span className="font-medium">₹{goal.projectedAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Goal Achievement:</span>
                            <span className="font-medium">{goal.achievementPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-purple-800 h-2 rounded-full"
                              style={{ width: `${goal.achievementPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {calculationResults.recommendations && calculationResults.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
                <ul className="space-y-2">
                  {calculationResults.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {calculationResults.portfolioAllocation && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Suggested Portfolio Allocation</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(calculationResults.portfolioAllocation).map(([key, value]: [string, any]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-lg font-bold text-purple-700">{value}%</p>
                      <p className="text-xs text-gray-600 mt-1 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-gray-500 italic">
            This is a projected estimate based on assumed market returns of 12% annually. Actual returns may vary.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Render the thank you step
const renderThankYouStep = (resetCalculator: () => void, showConfetti: boolean, viewFullReport: () => void) => {
  return (
    <div className="text-center space-y-6">
      {showConfetti && <div className="relative z-50" />}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white mb-6">
        <CheckCircle2 className="h-12 w-12" />
      </div>

      <Badge className="mx-auto mb-4 bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-3 py-1.5 text-sm font-medium">
        <Gift className="h-4 w-4 mr-1" />
        100% Free Service
      </Badge>

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
          onClick={viewFullReport}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
        >
          <Eye className="mr-2 h-5 w-5" />
          View Full Report
        </button>
      </div>

      <div className="mt-8 max-w-md mx-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">Enjoying our free calculator?</h4>
        <p className="text-sm text-gray-600 mb-3">
          Help others achieve financial freedom by sharing this tool with friends and family.
        </p>
        {/* <div className="flex justify-center gap-3">
          <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
            <Share2 className="h-5 w-5 text-blue-600" />
          </button>
        </div> */}
      </div>
    </div>
  )
}

// Render the full report step (step 9)
const renderFullReportStep = (
  formData: FinancialFormData,
  calculationResults: CalculationResults | null,
  resetCalculator: () => void,
) => {
  if (!calculationResults) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex items-center px-6 py-3 border border-purple-300 rounded-xl shadow-sm text-base font-bold text-white bg-gradient-to-r from-purple-600 to-purple-600 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 hover-lift animate-shake"
        >
          <ArrowRight className="mr-2 h-5 w-5" />
          Begin a New Calculation
        </button>

        <Badge className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200 flex items-center gap-1 px-3 py-1.5 text-sm font-medium">
          <Gift className="h-4 w-4 mr-1" />
          100% Free Service
        </Badge>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-2">
          Your Complete Investment Report
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto">
          Here's your comprehensive investment strategy based on the information you provided.
        </p>
      </div>

      {/* Investment Summary - This part will be fully visible */}
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
              <span className="text-gray-700">Monthly SIP Investment:</span>
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

          {/* Full content - not blurred */}
          <div className="mt-4">
            {calculationResults.goalProjections && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Goal Projections</h4>
                <div className="space-y-4">
                  {calculationResults.goalProjections.map((goal, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                          <Target className="h-3 w-3 text-purple-600" />
                        </div>
                        <h5 className="font-medium text-gray-900">{goal.goalName}</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Time Frame:</span>
                          <span className="font-medium">{goal.timeFrame} years</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Target Amount:</span>
                          <span className="font-medium">
                            ₹{Number.parseInt(formData.goals[index].amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span className="text-gray-600">Projected Amount:</span>
                          <span className="font-medium">₹{goal.projectedAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Goal Achievement:</span>
                            <span className="font-medium">{goal.achievementPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-purple-800 h-2 rounded-full"
                              style={{ width: `${goal.achievementPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {calculationResults.recommendations && calculationResults.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
                <ul className="space-y-2">
                  {calculationResults.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {calculationResults.portfolioAllocation && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Suggested Portfolio Allocation</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(calculationResults.portfolioAllocation).map(([key, value]: [string, any]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-lg font-bold text-purple-700">{value}%</p>
                      <p className="text-xs text-gray-600 mt-1 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-gray-500 italic">
            This is a projected estimate based on assumed market returns of 12% annually. Actual returns may vary.
          </div>
          {/* <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors">
            <Share2 className="h-3 w-3" />
            Share Report
          </button> */}
        </CardFooter>
      </Card>

      {/* Add a feedback/share section at the bottom */}
      <div className="mt-8 p-4 bg-purple-50 border border-purple-100 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2 text-center">How was your experience?</h4>
        <p className="text-sm text-purple-700 text-center mb-4">
          We hope you found our free financial planning tool helpful. Share it with others who might benefit!
        </p>
        {/* <div className="flex justify-center gap-3">
          <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors">
            <Share2 className="h-5 w-5 text-purple-600" />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default FinancialSteps2

