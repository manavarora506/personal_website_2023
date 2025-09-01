const https = require("https");

const { CHAT_KEY } = process.env;

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  let question;
  try {
    const body = JSON.parse(event.body);
    question = body.question;
    
    if (!question || question.trim().length === 0) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Question is required" })
      };
    }
  } catch (error) {
    return {
      statusCode: 400, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON in request body" })
    };
  }

  const resumeData = {
    name: "Manav Arora",
    contact: "manavarora506@gmail.com",
    website: "manavarora.me",
    social: "LinkedIn: linkedin.com/in/manav-arora1/ | GitHub: github.com/manavarora506",
    education: {
      
      degree: "Bachelor of Science in Electrical and Computer Engineering",
      university: "The University of Texas at Austin",
      duration: "Aug 2019 – May 2023",
      gpa: "3.53/4.0 (University Honors)",
      location: "Austin, TX"
    },
    technicalSkills: {
      languages: "Java, Python, PHP, JavaScript, TypeScript, HTML, CSS, Swift",
      frameworks: "React, Next, Node, Flask, MongoDB, Express, LangChain", 
      tools: "Git, Docker, AWS, MATLAB, Postman, Sequel Ace, Xcode, Intellij, Mirantis, Splunk, Jenkins"
    },
    experience: [
      {
        title: "Software Engineer",
        company: "Visa",
        location: "Austin, TX",
        duration: "May 2025 – Present",
        responsibilities: [
          "Developed and maintained backend services in Java enabling secure session tokens and passkeys for users accessing Visa's online payment portals, ensuring robust authentication and identity management",
          "Engineered OTP (one-time password) flow validation logic to guarantee accurate credential issuance and secure user-session linkage in the authentication pipeline"
        ]
      },
      {
        title: "Software Engineer",
        company: "AT&T",
        location: "Plano, TX",
        duration: "Oct 2023 – May 2025",
        responsibilities: [
          "Automated network planning tasks by utilizing the Forsk NAOS API to interact with ATOLL, an RF network designing tool, saving engineers an estimated 15 hours per week by eliminating manual processes",
          "Developed a Tkinter-based GUI for an internal executable, enabling users to submit and monitor batches of CSV files to a network planning optimization service",
          "Leveraged Pywinauto to automate the critical step of calculating remote gains in ATOLL, a function not supported by the NAOS API, ensuring accurate network planning automation despite API limitations"
        ]
      },
      {
        title: "Software Development Engineer Intern", 
        company: "GoLinks (YC '19)",
        location: "San Jose, CA",
        duration: "July 2023 – Sep 2023",
        responsibilities: [
          "Enhanced GoSearch, an internal search tool, by resolving 30+ bug tickets and integrating 10+ new features using React and Bootstrap",
          "Redesigned answers, an existing feature of GoSearch, by adding intuitive comment features, like the ability to add, edit, delete, up-vote, and pin comments",
          "Devised SQL schemas to efficiently manage comments, pinned comments, and upvotes for the updated answers feature"
        ]
      },
      {
        title: "Software Development Engineer Intern",
        company: "Amazon", 
        location: "Austin, TX",
        duration: "May 2022 – Aug 2022",
        responsibilities: [
          "Developed a dynamic color-swatch component for Amazon Homepage using Typescript and CSS, which was useful in showcasing diverse color choices for specific products",
          "Created a comprehensive color-swatch view-model leveraging internal API sub-resources for product variations, which served as template for future Amazon Homepage designs that required a color-swatch feature",
          "Implemented 10+ unit tests using Jest, ensuring a 90% coverage rate for the component, affirming its readiness for production deployment"
        ]
      }
    ],
    projects: [
      {
        name: "PrivacyCheck",
        technologies: "JavaScript, React, DynamoDB",
        description: "Drove the advancement of an ongoing project at the University of Texas, focused on bolstering user understanding of accepted privacy policies. Led the creation of a dynamic DynamoDB cache, that efficiently stored and granted access to privacy scores for the top 100 frequently visited internet sites."
      },
      {
        name: "Travel Itinerary Generator", 
        technologies: "Flask, React, OpenAI's GPT-3.5, Google Custom Search API",
        description: "Developed a web application that generates travel itineraries based on user input, providing detailed travel plans using AI and up-to-date information. Implemented the backend with Flask, integrating OpenAI's GPT-3.5 for itinerary generation and Google's Custom Search API for fetching recent events and places."
      }
    ]
  };

  const messages = [
    {
      role: "system",
      content: `You are an AI assistant representing Manav Arora on his personal website. You're knowledgeable, friendly, and enthusiastic about helping visitors learn more about Manav's background, experience, and projects. 

Key guidelines:
- Be conversational and personable, as if you're speaking on Manav's behalf
- Provide specific details from his resume when relevant 
- If asked about things not in his resume, politely redirect to his available information
- Encourage visitors to reach out directly for more detailed discussions
- Be concise but informative in your responses

You have access to Manav's complete professional profile including education, work experience, technical skills, and projects.`
    },
    {
      role: "system", 
      content: `PERSONAL INFO:
Name: ${resumeData.name}
Contact: ${resumeData.contact}
Website: ${resumeData.website}
Social: ${resumeData.social}

EDUCATION:
${resumeData.education.degree} from ${resumeData.education.university} (${resumeData.education.duration})
GPA: ${resumeData.education.gpa}
Location: ${resumeData.education.location}`
    },
    {
      role: "system",
      content: `TECHNICAL SKILLS:
Languages: ${resumeData.technicalSkills.languages}
Frameworks: ${resumeData.technicalSkills.frameworks}
Tools: ${resumeData.technicalSkills.tools}`
    },
    {
      role: "system", 
      content: `WORK EXPERIENCE:
${resumeData.experience.map(exp => 
        `${exp.title} at ${exp.company} (${exp.location}) - ${exp.duration}
        Key achievements: ${exp.responsibilities.join('; ')}`
      ).join('\n\n')}`
    },
    {
      role: "system",
      content: `PROJECTS:
${resumeData.projects.map(project => 
        `${project.name} - ${project.technologies}
        ${project.description}`
      ).join('\n\n')}`
    },
    {
      role: "user",
      content: question,
    },
  ];

  const options = {
    hostname: "api.openai.com",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHAT_KEY}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const data = JSON.parse(responseData);
            const answer = data.choices?.[0]?.message?.content?.trim() || "No response received";
            
            resolve({
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                answer: answer,
              }),
            });
          } else {
            console.error(`OpenAI API error: ${res.statusCode}`, responseData);
            console.error("Response headers:", res.headers);
            resolve({ 
              statusCode: 500, 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ error: `OpenAI API returned ${res.statusCode}: ${responseData}` })
            });
          }
        } catch (parseError) {
          console.error("Error parsing OpenAI response:", parseError);
          resolve({ 
            statusCode: 500, 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Invalid response from AI service" })
          });
        }
      });
    });

    req.on("error", (error) => {
      console.error("Request error:", error);
      resolve({ 
        statusCode: 500, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Network error occurred" })
      });
    });

    // Try GPT-5 Nano first, fallback to GPT-4o-mini if needed
    const requestPayload = { 
      model: "gpt-4o-mini", 
      messages,
      max_tokens: 500,
      temperature: 0.7
    };
    
    
    req.write(JSON.stringify(requestPayload));
    req.end();
  });
};
