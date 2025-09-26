export interface AuthorProfile {
  name: string;
  bio: string;
  email?: string;
  title?: string;
}

export const authorProfiles: Record<string, AuthorProfile> = {
  "Flt Lt Amit Sengupta": {
    name: "Flt Lt Amit Sengupta",
    title: "Entrepreneur & Thought Leader",
    bio: "Flt Lt Amit Sengupta is an entrepreneur and thought leader at In-Sync, a CX platform integrating AI agents into contact center workflows. He specializes in translating complex no-code CRM and agentic AI concepts into accessible insights for technical and executive audiences. His expertise spans AI-driven customer experience, business automation, and helping enterprises achieve scalable growth through intelligent platforms.",
    email: "a@in-sync.co.in"
  }
};

export const getAuthorProfile = (authorName: string): AuthorProfile => {
  return authorProfiles[authorName] || {
    name: authorName,
    bio: `${authorName} is a contributor to the In-Sync CRM blog, sharing insights on technology and business solutions to help companies succeed.`
  };
};