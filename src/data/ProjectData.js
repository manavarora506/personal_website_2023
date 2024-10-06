const projectsList = [
  {
    name: "A/B Testing Contact Form Project",
    date: "Fall 2024",
    tools: ["Flask", "Python", "React", "MongoDB", "FastAPI"],
    tagline: "A/B Testing Framework",
    description: `
        This project implements an A/B testing system for evaluating changes in contact form submission behavior on two different sites, Site A and Site B. 
        The system tracks metrics such as form submissions and visits for each site, allowing for a dynamic, admin-controlled frontend configuration for Site B.
      `,
    tag: "personal",
    links: {
      GitHub: "https://github.com/manavarora506/A-B-Testing",
    },
  },
  {
    name: "Travel Itinerary Generator",
    date: "Summer 2024",
    tools: ["Flask", "Python", "React"],
    tagline: "Discover what to do on your next trip",
    description: `
        A web application that generates travel itineraries based on user input, providing detailed travel plans
        using AI and up-to-date information.
      `,
    tag: "personal",
    links: {
      GitHub: "https://github.com/manavarora506/travel_agent",
    },
  },
  {
    name: "Cologne Finder",
    date: "Spring 2024",
    tools: ["Xcode", "Swift"],
    tagline: "Find a cologne that fits the mood and budget",
    description: `
        Consumers in the market for a new cologne can find a scent they like within their budget and mood that they are looking for.
      `,
    tag: "personal",
    links: {
      GitHub: "https://github.com/manavarora506/Cologne_Finder",
    },
  },
  {
    name: "Privacy Check",
    date: "Spring 2023",
    tools: ["JavaScript", "React", "DynamoDB"],
    tagline: "An extension to better explain those confusing privacy policies",
    description: `
      Privacy Check is an ongoing project at the University of Texas,
      focused on bolstering user understanding of accepted privacy policies. I led my team in the creation
      of a dynamic DynamoDB cache, designed as a responsive repository. It efficiently stored and
      granted access to privacy scores for the top 100 frequently visited internet sites which significantly sped up user 
      interactions while enhancing their understanding of privacy implications.
    `,
    tag: "School",
    links: {
      Website: "https://github.com/UTCID/PrivacyCheck/tree/manav-test",
    },
  },
  {
    name: "Interview GPT",
    date: "Summer 2023",
    tools: ["Javascript", "React", "LangChain", "Whisper"],
    tagline: "An AI application to help you prepare for technical interviews",
    description: `
      Leveraged ChatGPT and Whisper to build a web application that helps users prepare for technical interviews.
      Designed a user interface to model a code editor using the AceEditor library from React and utilized LangChain to serve as the main engine for the 
      application.
    `,
    tag: "personal",
    links: {
      Website: "https://github.com/InterviewGPT/web-app",
    },
  },
  {
    name: "GoLinks Hackday",
    date: "Summer 2023",
    tools: ["Javascript", "React"],
    tagline: "A prettier way to search on GitHub",
    description: `
      Leveraged the GitHub search API to design an interactive website to search and view repositories and their commits.
    `,
    tag: "work",
    links: {
      Website: "https://github.com/manavarora506/frontend-intern-hackday",
    },
  },
  {
    name: "Personal Website",
    date: "Fall 2023",
    tools: [
      "Next.js",
      "Tailwind CSS",
      "Netlify",
      "Postman",
      "OpenAI API",
      "Notion API",
    ],
    tagline: "This website!",
    description: `
        This website encapsulates all of my work!
      `,
    tag: "personal",
    links: {
      Website: "/",
      GitHub: "https://github.com/manavarora506/personal_website_2023",
    },
  },
  {
    name: "Baseball Pitch Type Prediction",
    date: "Spring 2023",
    tools: ["Python", "Scikit-learn", "XGBoost", "CatBoost"],
    tagline: "Critique on OpenAI's latest model",
    description: `
        For my final project in Data Science Lab (EE 460J), my group used baseball statistics and trained a model to
        predict the next pitch that would be thrown.
      `,
    tag: "school",
    links: {
      "Medium Article":
        "https://medium.com/@manavarora506/baseball-pitch-type-prediction-16aa7ae1e4f0",
      GitHub: "https://github.com/jrdsouza3/dslfinal/tree/main",
    },
  },
  {
    name: "Longhorn Hardware Services",
    date: "Spring 2022",
    tools: ["Flask", "React", "Heroku"],
    tagline: "Hardware Managing Platform",
    description: `
        This was a semester-long project for Software Engineering Lab (EE 461L) where we created a management
        platform to rent and return UT hardware.
        
      `,
    tag: "school",
    links: {
      GitHub: "https://github.com/pranavswami/461l",
    },
  },
];
export const ProjectData = {
  projectsList,
};
