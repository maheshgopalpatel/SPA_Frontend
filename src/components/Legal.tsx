import React from "react";

const Legal = () => {
  // Function to handle smooth scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">

        {/* 🧭 Top Navigation for Sections */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "privacy-policy", label: "Privacy Policy" },
            { id: "terms-of-service", label: "Terms of Service" },
            { id: "cookie-policy", label: "Cookie Policy" },
            // { id: "compliance", label: "Compliance" },
            // { id: "legal-notice", label: "Legal Notice" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 bg-white border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-white transition-all duration-300 shadow-sm"
            >
              {item.label}
            </button>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-center mb-12 text-accent">
          Legal & Compliance
        </h1>

        {/* 🧩 Privacy Policy */}
        <div id="privacy-policy" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            At Sai Construction, we value your privacy and are committed to
            protecting your personal information. This policy outlines how we
            collect, use, and safeguard data related to our projects, clients,
            and partners. We only collect necessary data for communication,
            project management, and service improvement. We do not share your
            information with third parties without your consent, except when
            required by law.
          </p>
        </div>

        {/* 🧩 Terms of Service */}
        <div id="terms-of-service" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using Sai Construction’s website or services, you
            agree to our terms. All project agreements are bound by mutual
            consent and documented in formal contracts. The company reserves the
            right to modify content, pricing, or project timelines with prior
            notice. Unauthorized reproduction of any design, data, or project
            detail is strictly prohibited.
          </p>
        </div>

        {/* 🧩 Cookie Policy */}
        <div id="cookie-policy" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website uses cookies to enhance user experience, analyze traffic,
            and personalize content. You can manage cookie settings in your
            browser at any time. Disabling cookies may affect certain features
            and performance of the site.
          </p>
        </div>

        {/* 🧩 Compliance
        <div id="compliance" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Compliance</h2>
          <p className="text-gray-700 leading-relaxed">
            Sai Construction adheres to all applicable Indian government and
            local construction compliance standards. All projects follow
            environmental, labor, and safety regulations as per BIS, CPWD, and
            state-specific norms. Krinexiya ensures that all digital platforms
            for Sai Construction meet required cybersecurity and data protection
            measures.
          </p>
        </div> */}

        {/* 🧩 Legal Notice
        <div id="legal-notice" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Legal Notice</h2>
          <p className="text-gray-700 leading-relaxed">
            All content, text, images, and project details on this website are
            the intellectual property of Sai Construction and Krinexiya. Any
            unauthorized use, distribution, or modification without written
            permission is a violation of copyright and may result in legal
            action.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Legal;
