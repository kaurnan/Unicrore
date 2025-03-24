import React, { useEffect } from 'react';

export default function Disclaimer() {
    useEffect(() => {
        // Scroll to top when the component is mounted
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <div id="disclaimer" className="min-h-screen flex flex-col">
        <div className="max-w-7xl px-4 mx-0 md:mx-40 my-2 py-2">
            <a href="#home" className="flex items-center">
            <img src="/logo (purple).png" alt="Unicrore Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
            <img
                src="/wordmark (purple).png"
                alt="Unicrore Written"
                className="hidden lg:block h-8 sm:h-10 md:h-12 w-auto ml-2"
            />
            </a>
        </div>
      <main className="flex-grow pt-10 pb-16">
        <div className="bg-purple-900 text-white text-center py-12 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-lg">Updated 25th March 2024</p>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <section className="prose prose-purple max-w-none">
            <p>
              The site, including any content or information contained with it or any site-related service, or any
              product or service licensed or purchased through the site, is provided on an " as is" basis and without
              warranties of any kind, either express or implied, including, but not limited to warranties of title or
              non-infringement or implied or warranties of merchantability and fitness for a particular purpose, other
              than those warranties which are implied by and incapable of exclusion, restriction or modification under
              the laws applicable to this agreement. You acknowledge that any warranty that is provided in connection
              with any of the products or services described herein is provided solely by the owner, advertiser,
              manufacturer or supplier of that product and/or service, and not by Ncosecurities.com. Ncosecurities.com
              does not warrant that your access to the site and/or related services will be uninterrupted or error-free,
              that defects will be corrected, or that this site or the server that makes it available is free of viruses
              or other harmful components. Access to and use of this site and the information is at your risk and
              Ncosecurities.com does not undertake any accountability for any irregularities, viruses or damage to any
              computer that results from accessing, availing or downloading of any information from this site.
              Ncosecurities.com does not warrant or make any representations regarding the use or the results of the use
              of any product and/or service purchased in terms of its compatibility, correctness, accuracy, reliability
              or otherwise. You assume total responsibility and risk for your use of this site and site-related
              services.
            </p>

            <p>
              You agree that, except as provided under the Ncosecurities.com return policy, Ncosecurities.com and its
              directors, officers, employees, agents, sponsors, consultants, business partners or other representatives
              ('service providers') shall not be responsible or liable for any direct, indirect, incidental,
              consequential, special, exemplary, punitive or any other damages (including without limitation loss of
              profits, loss or corruption of data, loss of goodwill, work stoppage, computer failure or malfunction, or
              interruption of business) under any contract, negligence, strict liability or other theory arising out of
              or relating in any way with the use of the site or in reliance of the information available on the site,
              site-related services, or any products or services offered or sold or displayed on the Ncosecurities.com
              site. If the foregoing limitation is held to be unenforceable, the maximum liability of NCO SECURITIES AND
              SHARE BROKING PVT LTD. and its service providers to you shall not exceed the amount of fees paid by you
              for the products or services that you have ordered through the site.
            </p>

            <p>
              A possibility exists that the site could include inaccuracies or errors. Additionally, a possibility exist
              that unauthorised additions, deletions or alterations could be made by third parties to the site. Although
              NCO SECURITIES AND SHARE BROKING PVT LTD attempts to ensure the integrity, correctness and authenticity of
              the site, it makes no guarantees whatsoever as to its completeness, correctness or accuracy. In the event
              that such an inaccuracy arises, please inform NCO so that it can be corrected.
            </p>

            <p>
              The price and value of investments and the income derived from them can go down as well as up, and you may
              not get back the amount you invest. Changes in the rate of exchange may have an adverse effect on the
              value, price and income of investments in deposits other than your own. Past performance is not
              necessarily a guide to future performance. The services and investments referred to in our Site may have
              tax consequences and it is important to bear in mind that NCO does not provide tax advice. The level of
              taxation depends on individual circumstances and such levels and bases of taxation can change. You should
              consult your own tax advisor in order to understand any applicable tax consequences.
            </p>

            <p>
              NCO does not make any personal recommendations. The information on our Internet site is provided solely to
              enable investors to make their own investment decisions and does not constitute a recommendation to buy,
              sell or otherwise deal in investments. Our services and the securities we offer services on may not be
              suitable for all customers and, if you have any doubts, you should seek advice from an independent
              financial adviser.
            </p>

            <p>
              This Internet site is only available to residents in India and is presently not available to foreign
              residents including nonresident Indians (NRIs) in foreign jurisdiction where the services cannot be
              offered without prior regulatory compliance. In such cases due efforts are been made to comply with
              regulatory requirements in various jurisdictions which shall be notified from time to time. This service
              does not constitute an offer to sale or a solicitation to any person in any jurisdiction where it is
              unlawful to make such an offer or solicitation.
            </p>

            <p>
              No information, market analysis, research report etc. on the web site is to be construed as a
              representation with respect to shares, securities or other investments regarding the legality of an
              investment there in under the respective applicable investment or similar laws or regulations of any
              person or entity accessing the website.
            </p>

            <p>
              You understand and agree that no joint venture, partnership, employment or agency relationship exists
              between you and us as a result of this agreement or on account of use of our web site.
            </p>

            <p>
              Price and availability of products and services offered on the site are subject to change without prior
              notice. To the extent we provide information on the availability of products or services you should not
              rely on such information. NCO SECURITIES AND SHARE BROKING PVT LTD will not be liable for any lack of
              availability of products and services you may order through the site.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Governing Law</h2>
            <p>
              Transactions between you and NCO SECURITIES AND SHARE BROKING PVT LTD shall be governed by and construed
              in accordance with the laws of India, without regard to the laws regarding conflicts of law. Any
              litigation regarding this agreement or any transaction between customer and Ncosecurities.com or any
              action at law or in equity arising out of or relating to these agreement or transaction shall be filed
              only in the competent Courts of Mumbai alone and the customer hereby agrees, consents and submits to the
              jurisdiction of such courts for the purpose of litigating any such action.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">BSE Disclaimer</h2>
            <p>
              The Stock Exchange, Mumbai is not in any manner answerable, responsible or liable to any person or persons
              for any acts of omission or commission, errors, mistakes and/or violation, actual or perceived, by us or
              our partners, agents, associates etc., of any of the Rules, Regulations, Bye-laws of the Stock Exchange,
              Mumbai, SEBI Act or any other laws in force from time to time. The Stock Exchange, Mumbai is not
              answerable, responsible or liable for any information on this Website or for any services rendered by us,
              our employees, and our servants.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

