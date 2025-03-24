"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Quote } from "lucide-react"

interface CalculatorResourcesProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CalculatorResources({ open, onOpenChange }: CalculatorResourcesProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Resources & Support
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="faqs" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-purple-200">
            <TabsTrigger value="faqs" className="tab-trigger">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="stories" className="tab-trigger">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs" className="mt-4 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Is this calculator really free?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Our financial calculator is 100% free to use. There are no hidden fees, or any other requirements.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">How accurate are the projections?</h4>
              <p className="text-gray-600 text-sm">
                Our calculator uses standard financial formulas and assumptions based on historical market performance.
                While no projection can guarantee future results, our calculator provides a solid foundation for
                financial planning.
              </p>
            </div>

            {/* {/* <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Do I need to create an account?</h4>
              <p className="text-gray-600 text-sm">
                No account creation is necessary. You can use our calculator immediately and get your personalized
                financial plan without signing up.
              </p>
            </div> */}

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-2">How is this free? What's the catch?</h4>
                <p className="text-gray-600 text-sm">
                    There's no catch! We believe financial planning should be accessible to everyone. We offer this tool for
                    free to help people make better financial decisions. If you find it valuable, we simply ask you to share
                    it with others who might benefit.
                </p>
            </div> 
          </TabsContent>

          <TabsContent value="stories" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Quote className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-gray-700 italic flex-1">
                    The financial calculator helped me create a solid investment strategy for my retirement. I've
                    already seen a 15% growth in my portfolio within 6 months!
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg mr-3">
                      R
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rajesh Mehta</h4>
                      <p className="text-sm text-gray-500">Small Business Owner</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Quote className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-gray-700 italic flex-1">
                    I was overwhelmed by investment options until I used this calculator. It simplified everything and
                    gave me a clear roadmap to achieve my financial goals.
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg mr-3">
                      A
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Anita Sharma</h4>
                      <p className="text-sm text-gray-500">IT Professional</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

