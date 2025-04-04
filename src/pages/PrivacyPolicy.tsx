import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div id="privacy-policy" className="min-h-screen flex flex-col" >
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg">Updated 25th March 2024</p>
          </div>
          <div className="max-w-6xl mx-auto px-6">
            <section className="prose prose-purple max-w-none">
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Introduction</h2>
            <p>
              In the course of using this website or any of the websites under the 'NCO' domain or availing the products
              and services vide the online application forms and questionnaires, online consents and such other details
              required from time to time on any of NCO's (and/or its affiliates) web platforms or mobile applications,
              NCO and/or its affiliates may become privy to some of Your personal information, including which may or
              may not be of confidential nature. NCO is strongly commited to protecting the privacy of its users/clients
              and has taken all necessary and reasonable measures to protect the confidentiality of any customer
              information.
            </p>

            <p>
              For the purpose of these Privacy Policy, wherever the context so mentions "Covered Persons", "Client",
              "You" or "Your", it shall mean any natural or legal person who has visited this website/plaDorm and/or has
              agreed to or has enquired open an account and/or initiated the process of opening an account with NCO
              (also defined as "Covered Persons").
            </p>

            <p>
              NCO allows any person to use/visit/browse the website without registering on the website. The term "We",
              "Us", "Our" and "Team NCO" shall mean NCO Securities and share Broking Pvt Ltd. (hereinafter shall be
              referred together as 'NCO'). NCO Securities and share Broking Pvt Ltd is a Trading Member of NSE and BSE,
              registered with Securities & Exchange Board of India ("SEBI") and having Registration No. INZ000260334.
              This website is owned, operated and maintained by NCO Securities and share Broking Pvt Ltd, a Company
              incorporated under the Companies Act, 2013 having CIN: U67120KA2007PTC044047, and having its Registered
              Office at No 350,1st Floor, 36th A Cross 7th Main Rd 5th Block Jayanagar, Bengaluru, KA 560041.
            </p>

            {/* Add more content sections here */}
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Scope of Privacy Policy</h2>
            <p>
              Any natural or legal person who has visited the NCO website/plaDorm and/or the mobile application, and/or
              who may or may not have further agreed to initiate the process of opening an account with NCO shall come
              under the purview of the scope of this Privacy Policy. NCO shall at all times follow all such rules
              prescribed under the Information Technology Act, 2000, and rules & procedural guidelines set by the
              Securities Exchange Board of India ("SEBI") and/or any of its regulated entities/intermediaries that NCO
              is a member of.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Collection and use of your Personal Information
            </h2>
            <p>
              NCO may or may not collect your Personal Information to provide services on its web based plaDorm or
              mobile application. While opening a trading and demat account with NCO, you may be asked for certain
              Sensitive Personal Data or Information (as defined under the Information Technology Act, 2000) to complete
              your KYC (as per the 'Know Your Client' requirements set by SEBI) and as per the Prevention of Money
              Laundering Act, 2002.
            </p>

            <p>
              NCO, may or may not, request for sensitive information from You at the time of account opening, which
              would include but not be limited to, (i) seking a password; (ii) financial information such as Bank
              account or credit card or debit card or other payment instrument details; (iii) information such as name,
              contact number, gender, date of birth, residence and employment addresses, father's/mother's and spouses
              names, bank account details, scans/ copies of document proofs of address & identity such as Photograph,
              PAN, passport, drivers license, Aadhaar (voluntarily) etc. (iv) uploading signature proof/photo etc. All
              such information would be for the purpose of: identity verification and background checking for account
              opening as per KYC & AML Rules, personalising services offered to you, keeping you updated of our products
              and services relevant to you, information pertaining to our services you've subscribed to, and for any
              legal and regulatory / audit purposes.
            </p>

            <p>
              Under Regulation 5 of the Information Technology (Reasonable Security and Procedures and Sensitive
              Personal Data or Information) Rules, 2011, NCO is obliged to provide every registered user of NCO with a
              readable copy of the personal information you have provided us. We would save such information as required
              by the law, and as directed by the regulators along with such intermediaries regulated by them, for the
              purpose of offering You our services, and for such further regulatory, audit, and business purposes. We
              collect Personal Information from you only when you voluntarily use the services provided by NCO, and/or
              enquire to begin an association with NCO and/or complete the process of opening an account with NCO.
            </p>

            <p>
              With regard to security, we respect all information provided to us, and take all reasonable steps towards
              protection of the same. We have implemented technology and policies, with the objective of protecting your
              privacy from unauthorized access and improper use, and periodically review the same. We maintain
              procedural safeguards to protect the confidentiality and security of personally identifiable information
              transmitted to us.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Aadhaar User Consent Policy</h2>
            <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">Voluntary Act</h3>
            <p>
              The act of providing your Aadhaar is voluntary in nature, which will only be required for completing your
              account opening procedure online and for digitally signing the NCO account opening form. Your Aadhaar may
              also be used as a proof of address as an alternative choice to driving license or Passport copy, which is
              a voluntary decision to be made by You. You may alternatively choose to go through the offline route of
              account opening by physically signing all such account opening documents, which does not require you to
              share your Aadhaar information at all.
            </p>

            <h3 className="text-xl font-semibold text-purple-700 mt-6 mb-3">
              NCO does not Store any Aadhaar Information
            </h3>
            <p>
              During your online account opening process, you do not input any Aadhaar details on the NCO plaDorm. You
              would be issuing your Digital Aadhaar to Digilocker, from where NCO (NCO is registered as a Requester on
              the Digilocker plaDorm) would receive information, based on your consent to allow Digilocker to share such
              information with NCO, limited to:
            </p>

            <p>
              (1) The last four digits of your Aadhaar / VID (Virtual ID created on the UIDAI website), (2) Full Name,
              (3) Date of Birth, (4) Gender, (5) Address, and (6) Your Photo.
            </p>

            <p>
              Digilocker is a part of the National eGovernance Division under the Ministry of Electronics & Information
              Technology (MeitY), Government of India. The Digital Aadhaar issued within DigiLocker is the same as the
              eAadhaar issued by UIDAI (hHps://eaadhaar.uidai.gov.in). DigiLocker has partnered with UIDAI to make it
              available automatically to its users when they link their DigiLocker account with Aadhaar. This act of
              issuing an eAadhaar within Digilocker and subsequently Digilocker sharing the information limited to the
              above points, leads to behaving as a physical KYC. NCO only receives information limited to the above
              points for the purposes of completing KYC of clients online. All clients may alternatively follow the
              offline route of account opening, which does not require sharing any Aadhaar related information. During
              your online account opening process, you would also be sharing your Aadhaar with NSDL Esign Services for
              the purpose of digitally signing the NCO account opening form. NSDL Esign Services does not share your
              Aadhaar with NCO. After the account opening form has been digitally signed by you, a copy of the digitally
              signed form would be emailed to you and to NCO for reference/audit purposes. NSDL Esign Services is a
              licensed e-Sign ASP (Application Services Provider) with CDAC, compliant with the guidelines laid down by
              the Controller of Certifying Authorities (CCA), India and UIDAI, to enable you to eSign the account
              opening forms online.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Collection and use of your Non-personal Information
            </h2>
            <p>
              NCO may from time to time collect information, i.e. Non-personal information which cannot be used to
              identify you personally, while You are using the website or mobile application. NCO may from time to time
              collect information such as Non-personal information such as IP (internet protocol) addresses, browser
              types, the name of your ISP (internet service provider), information about a third-party link/URL from
              where You arrive to our website/ mobile application, which pages/URLs do You click on the NCO website /
              mobile application, and the amount of time spent on each. NCO uses Google Analytics, a web analytics
              service provided by Google, Inc. Google Analytics uses first-party cookies to report on user interactions
              with our web-based services. These cookies store non-personally identifiable information.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Usage of Cookies</h2>
            <p>
              NCO may from time to time use cookies. Cookies are small data files that a website stores on Your
              computer. NCO may use persistent cookies which are permanently placed on your computer to store
              non-personal (Browser, ISP, OS, Clickstream information etc) and profiling information (age, gender,
              income etc). While cookies have unique identification nos, personal information (name, a/c no, contact nos
              etc) shall not be stored on the cookies. We will use the information stored in the cookies to improve Your
              browsing experience on our website, by throwing up relevant content where possible. We will also use the
              cookies to store visitor preferences to ease visitor navigation on the site.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Disclosure and Transfer of Collected Information
            </h2>
            <p>
              NCO does not share any of your information with third parties except: (i) with respect to providing the
              information or services that you have requested earlier, (ii) or with your express permission for sharing
              such information, or (iii) with intermediaries/applications who require such information as per regulatory
              requirements and procedure laid down by SEBI/Exchanges.
            </p>

            <p>
              Under no circumstances will we sell or rent your personal information to anyone, for any reason, at any
              time. NCO has taken best and reasonable steps to ensure prevention of any unauthorised disclosure of your
              sensitive personal information.
            </p>

            <p>
              Disclosure for regulatory compliances: NCO will share your information with judicial, administrative and
              regulatory entities to comply with any legal and regulatory requirements.
            </p>

            <p>
              Disclosures with your prior consent: If, at any time, you choose to utilise the integrated services of
              third party service partners through us, we will share your information with these third party service
              partners with your prior consent.
            </p>

            <p>
              Disclosure for provision of services: NCO will share your information with third party vendors of NCO as
              necessary for the provision of services. Authorized third party vendors are bound by the same standards of
              data security practices and procedures as we are under law and contract. They are subject to the same
              penalties as we are for the unauthorised disclosure of your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Privacy Statement as per EU-GDPR</h2>
            <p>
              NCO shall implement and fulfil all its obligations under the EU General Data Protection Regulation
              2016/679 ("GDPR"). NCO shall process any personal data we collect from you in accordance with Data
              Protection Legislation and the provisions of this Policy. In case You are subjected to the above stated
              Regulation, You would have the below stated rights:
            </p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>You may request your data be deleted or corrected;</li>
              <li>You may request for access of any data that has been stored by NCO for providing You services;</li>
              <li>
                You may request storable & readable data to be transferred to another party, this shall be done by NCO
                to the maximum extent possible;
              </li>
              <li>As and where any data is requested, it would be taken only post your prior consent.</li>
            </ul>

            <p>
              We are permitted to process your personal data in compliance with Data Protection Legislation by relying
              on one or more of the following lawful grounds:
            </p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>You have explicitly agreed to us processing such information for a specific reason.</li>
              <li>
                The processing is necessary to perform the agreement we have with you or to take steps to enter into an
                agreement with you.
              </li>
              <li>The processing is necessary for compliance with a legal obligation we have.</li>
              <li>
                The processing is necessary for the purposes of a legitimate interest pursued by us, which might be: to
                provide services to you; to ensure that Your trading & demat account products/services are running
                smoothly;
              </li>
              <li>
                To prevent, detect, investigate and prosecute fraud and alleged fraud, money laundering and other crimes
                and to verify your identity in order to protect our business and to comply with laws that apply to us
                and/or where such processing is a contractual requirement of the services you have requested;
              </li>
              <li>to ensure that complaints are investigated;</li>
              <li>to evaluate, develop or improve our services; or</li>
              <li>
                to keep our customers informed about relevant services, unless you have indicated at any time that you
                do not wish us to do so.
              </li>
            </ul>

            <p>
              You may refuse to accept cookies by activating the sekng on your browser which allows you to refuse the
              sekng of cookies. However, if you select this sekng you may be unable to access certain parts of our
              website. Unless you have adjusted your browser sekng so that it will refuse cookies, our system will issue
              cookies when you log on to our site.
            </p>

            <p>
              AVer giving a written notice, a user, who is subject to GDPR, shall have the right to receive Personal
              Information and Non-Personal Information, which is provided to NCO during the usage of NCO's services,
              such that, this information may be used by another entity which is technically feasible by all parties to
              the maximum extent possible. For sending across any notice pertaining to removal or requesting to receive
              all such Personal Information and Non- Personal Information, such that, this information may be
              transferred to another entity/ controller of such data as per the GDPR, all subject users are required to
              write to "ganesan@ncosecurities.com". The designated Data Protection Officer for the purposes of this GDPR
              shall be Mr Ganesan.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">Security</h2>
            <p>
              Our hosting services and servers maintain its systems in accordance with industry standards and best
              practices to reasonably secure the information of its customers, such as using SSL encryption in certain
              places to prevent eavesdropping, and employing up-to-date software on the server. However, no data
              transmission over the Internet can be guaranteed to be 100% secure. "Perfect security" does not exist on
              the Internet, and therefore You use the website and mobile application at your own risk. Your data is
              transmiHed between your device and our servers using HTTPS protocol for encryption. HTTPS is the
              technology used to create secure connections for your web browser, and is indicated by a padlock icon in
              your browser.
            </p>

            <p>
              NCO follows industry best practices, using open and known principles when transferring and storing your
              data. We believe the biggest threat to the security and privacy of your data is if someone gains access to
              any of your devices. Remember to keep your password safe and secret to prevent unauthorised access to your
              NCO account. If you think that the security of your NCO account has been compromised, change your password
              and contact us immediately for further assistance.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Correction/ Updating or Access to Personal Information
            </h2>
            <p>
              Our hosting services and servers maintain its systems in accordance with industry standards and best
              practices to reasonably secure the information of its customers, such as using SSL encryption in certain
              places to prevent eavesdropping, and employing up-to-date software on the server. However, no data
              transmission over the Internet can be guaranteed to be 100% secure. "Perfect security" does not exist on
              the Internet, and therefore You use the website and mobile application at your own risk. Your data is
              transmiHed between your device and our servers using HTTPS protocol for encryption. HTTPS is the
              technology used to create secure connections for your web browser, and is indicated by a padlock icon in
              your browser.
            </p>

            <p>
              NCO follows industry best practices, using open and known principles when transferring and storing your
              data. We believe the biggest threat to the security and privacy of your data is if someone gains access to
              any of your devices. Remember to keep your password safe and secret to prevent unauthorised access to your
              NCO account. If you think that the security of your NCO account has been compromised, change your password
              and contact us immediately for further assistance.
            </p>
            {/* Continue with more sections as needed */}
          </section>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicy

