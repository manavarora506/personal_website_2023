const projectsList = [
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
    tag: "Personal",
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
    tag: "Work",
    links: {
      Website: "https://github.com/manavarora506/frontend-intern-hackday",
    },
  },

  {
    name: "Personal Website",
    date: "Fall 2023",
    tools: ["Next.js", "Tailwind CSS", "Netlify", "Postman", "OpenAI API", "Notion API"],
    tagline: "This website!",
    description: `
        This website encapsulates all of my work!
      `,
    tag: "Personal",
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
    tag: "School",
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
    tag: "School",
    links: {
      GitHub: "https://github.com/pranavswami/461l",
    },
  },
];

export const ProjectData = {
  projectsList,
};
