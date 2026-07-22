export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = "DataSpark Tech LLC";
const SITE = "MyHealthyGlucose";
const EMAIL = "connect@myhealthyglucose.com";
const UPDATED = "July 2026";

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: UPDATED,
    intro: `This Privacy Policy explains how ${COMPANY} ("we", "us") handles information when you use the ${SITE} website. We've tried to write it in plain language. This is a general policy and not legal advice.`,
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We aim to collect as little as possible. The website's calculators and tools run entirely in your browser and do not send what you enter to us.",
          "We collect information only when you actively provide it: your email address if you subscribe to our newsletter; your name, email, and message if you use the contact form; and your name, location, and testimonial text if you submit a community story. If you are a team member, we process your login email for authentication.",
          "Like most websites, our hosting and infrastructure providers may automatically process limited technical data (such as IP address and browser type) for security and reliability.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "We use the information you provide only for the purpose you gave it: to reply to your message, send you the newsletter you asked for, display an approved testimonial, or manage the site as a team member.",
          "We do not sell your personal information. Our products are ad-free, and we do not share your information with advertisers.",
        ],
      },
      {
        heading: "Service providers",
        body: [
          "We rely on trusted third-party services to run the site: Supabase (database, authentication, and the AI assistant function), Formspree (contact-form delivery), and GitHub Pages (website hosting). When you use a feature powered by one of these, the relevant information is processed by that provider under their own terms and privacy policies.",
          "Our optional AI assistant sends your typed question to an AI provider to generate a response. Please do not enter sensitive personal or medical details into the assistant.",
        ],
      },
      {
        heading: "Cookies and tracking",
        body: [
          "We keep tracking to a minimum. Any analytics we use are intended to understand general, aggregate usage (like which pages are popular) rather than to identify you individually. Your browser settings let you control cookies.",
        ],
      },
      {
        heading: "Your choices and rights",
        body: [
          "You can unsubscribe from the newsletter at any time. You can ask us to access, correct, or delete personal information you've given us by emailing us. Depending on where you live, you may have additional rights under laws such as the GDPR (EU/UK) or CCPA (California).",
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "The website is intended for a general adult audience and is not directed at children. We do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update this policy from time to time; the 'last updated' date above reflects the latest version.",
          `Questions about privacy? Email us at ${EMAIL}.`,
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    updated: UPDATED,
    intro: `These Terms of Use govern your use of the ${SITE} website, operated by ${COMPANY}. By using the site, you agree to these terms. This is a general document and not legal advice.`,
    sections: [
      {
        heading: "Educational purpose only",
        body: [
          "The website, including its calculators, guides, blog, and AI assistant, is provided for general educational and informational purposes only. It is not medical advice and is not a substitute for professional diagnosis or treatment. See our Medical Disclaimer for details.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree to use the site lawfully and not to misuse it — for example, by attempting to disrupt it, access it in unauthorized ways, submit harmful or misleading content, or infringe others' rights. Community submissions (testimonials, feature requests) may be moderated, edited, or removed at our discretion.",
        ],
      },
      {
        heading: "Accounts",
        body: [
          "Some areas are restricted to authorized team members. If you have an account, you are responsible for keeping your credentials secure and for activity under your account.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          `The content and design of the site are owned by ${COMPANY} or its licensors, except where third-party materials are used. You may view and share content for personal, non-commercial use, but may not copy or republish it wholesale without permission.`,
        ],
      },
      {
        heading: "Third-party links and services",
        body: [
          "The site may link to or rely on third-party services and websites. We are not responsible for the content or practices of those third parties.",
        ],
      },
      {
        heading: "Disclaimers and limitation of liability",
        body: [
          "The site is provided 'as is' and 'as available', without warranties of any kind, to the fullest extent permitted by law. We do not guarantee the site will be error-free, uninterrupted, or that its information is complete or current.",
          "To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or reliance on, the site or its content. Always consult a qualified professional for medical decisions.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update these terms from time to time. Continued use of the site means you accept the current version.",
          `Questions? Email us at ${EMAIL}.`,
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Medical Disclaimer",
    updated: UPDATED,
    intro: `Your health matters, so please read this carefully. The ${SITE} website and app are tools for education and personal tracking — not medical devices or a source of medical advice.`,
    sections: [
      {
        heading: "Not medical advice",
        body: [
          "All content on this site — including guides, blog posts, calculators, the glossary, and the AI assistant — is provided for general educational and informational purposes only. It is not intended to be, and should not be treated as, a substitute for professional medical advice, diagnosis, or treatment.",
          "Always seek the advice of your physician or another qualified health provider with any questions you have about a medical condition, medications, or your personal health. Never disregard professional medical advice or delay seeking it because of something you read here.",
        ],
      },
      {
        heading: "Estimates and general information",
        body: [
          "Our calculators (such as carb, BMI, A1C, and insulin-ratio tools) produce general estimates based on standard formulas and typical values. They are not precise, personalized, or clinical figures. Real values vary by individual, and dosing decisions in particular must come only from your care team.",
        ],
      },
      {
        heading: "The AI assistant",
        body: [
          "The AI assistant provides general educational information about diabetes and health. It can make mistakes, cannot diagnose you, and does not know your medical history. Do not rely on it for personal medical decisions, and do not enter sensitive personal information into it.",
        ],
      },
      {
        heading: "In an emergency",
        body: [
          "If you think you may have a medical emergency, call your doctor or your local emergency services immediately. Do not rely on this website or app in an emergency.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this disclaimer? Email us at ${EMAIL}.`],
      },
    ],
  },
};

export function getLegalDoc(slug: string) {
  return LEGAL_DOCS[slug];
}
