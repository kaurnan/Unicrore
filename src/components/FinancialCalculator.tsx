"use client"

import { ChevronRight, ChevronLeft, Calculator, CheckCircle2, Gift, Share2 } from "lucide-react"
import AnimatedSection from "./AnimatedSection"
import FinancialSteps from "./FinancialSteps"
import { useFinancialCalculator } from "./FinancialCalculatorHook"
import Confetti from "./ui/Confetti"
import FinancialCalculatorIntro from "./FinancialCalculatorIntro"
import { Badge } from "@/components/ui/badge"

const FinancialCalculator = () => {
  const {
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
    viewFullReport,
  } = useFinancialCalculator()

  // Progress indicator
  const renderProgressIndicator = () => {
    const progress = getProgressPercentage()
    const stepName = getCurrentStepName()

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
              <span className="text-medium font-semibold inline-block text-green-600">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-green-800"
            ></div>
          </div>
          <div className="text-xs text-purple-600 text-center">
            Step {currentStep} of {totalSteps}: {stepName}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="financial-calculator"
      className="bg-gradient-to-b from-purple-70 via-white to-purple-70 min-h-screen scroll-smooth"
    >
      <main className="flex-grow">
        {!showCalculator ? (
          <FinancialCalculatorIntro onStart={() => setShowCalculator(true)} />
        ) : (
          <div className="container mx-auto px-4 max-w-6xl">
            <AnimatedSection className="text-center mb-12 animate-fade-in-up mt-6">
              <div className="flex justify-center mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-4 py-2 text-base font-medium">
                  <Gift className="h-5 w-5 mr-1" />
                  100% Free Financial Planning Tool
                </Badge>
              </div>

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
                <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Calculator className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-bold">Investment Planning Questionnaire</h3>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">Free</Badge>
                </div>

                <div className="p-6 md:p-8">
                  {renderProgressIndicator()}

                  <form onSubmit={(e) => e.preventDefault()}>
                    <FinancialSteps
                      currentStep={currentStep}
                      formData={formData}
                      calculationResults={calculationResults}
                      calculationComplete={calculationComplete}
                      reportGenerated={reportGenerated}
                      showConfetti={showConfetti}
                      showFullReport={showFullReport}
                      handleInputChange={handleInputChange}
                      handleRadioChange={handleRadioChange}
                      handleGoalChange={handleGoalChange}
                      addGoal={addGoal}
                      removeGoal={removeGoal}
                      calculateInvestment={calculateInvestment}
                      generateReport={generateReport}
                      resetCalculator={resetCalculator}
                      nextStep={nextStep}
                      viewFullReport={viewFullReport}
                    />

                    {currentStep < 6 && (
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

                        <button
                          type="button"
                          onClick={nextStep}
                          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          Next
                          <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center text-sm text-purple-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                  <p>Your information is secure and will only be used to provide you with investment advice.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Found this helpful?</span>
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Free Guarantee Banner */}
              <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Gift className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-green-800">100% Free Financial Planning</h4>
                    <p className="text-sm text-green-700">No credit card required, no hidden fees, no subscriptions</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">Always Free</Badge>
              </div>
            </AnimatedSection>
          </div>
        )}
      </main>
      <Confetti active={showConfetti} />
    </section>
  )
}

export default FinancialCalculator

