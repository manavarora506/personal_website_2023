const https = require("https");

const { CHAT_KEY } = process.env;

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { question } = JSON.parse(event.body);

  const resumeData = {
    name: "Manav Arora",
    contact: "469-442-9910 | manavarora506@gmail.com",
    social: "LinkedIn: /in/manav-arora1/ | GitHub: manavarora506",
    education:
      "B.S. in Electrical and Computer Engineering with Business Minor from The University of Texas at Austin (2019-2023). Key Courses: Software Design, Algorithms, Digital Signal Processing, Data Science Lab",
    experience: [
      "Software Dev. Engineer Intern, GoLinks (YC ’19), CA (Remote) Jul-Sep 2023. Enhanced GoSearch and improved answer components.",
      "Software Dev. Engineer Intern, Amazon, Austin, TX May-Aug 2022. Developed a color-swatch component in TypeScript/CSS.",
      "Training Development Intern, Mavenir, Richardson, TX May-Oct 2021. Created curriculum for 5G and Open-RAN.",
    ],
    projects:
      "PrivacyCheck (May 2023): DynamoDB cache in React. Interview GPT (May 2023): ChatGPT for tech interview practice.",
    skills:
      "Java, Python, JavaScript, TypeScript, MATLAB, React, Node.js, Flask, JUnit, MongoDB, Git, Docker, VS Code, Visual Studio, IntelliJ, pandas, NumPy, MaterialUI",
  };

  
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that will answer questions based on Manav Arora's resume.",
    },
    {
      role: "system",
      content: `Name: ${resumeData.name}. Contact: ${resumeData.contact}. Social Profiles: ${resumeData.social}.`,
    },
    {
      role: "system",
      content: `Education: ${resumeData.education}`,
    },
    {
      role: "system",
      content: `Experience: ${resumeData.experience.join(" ")}`,
    },
    {
      role: "system",
      content: `Projects: ${resumeData.projects}`,
    },
    {
      role: "system",
      content: `Skills: ${resumeData.skills}`,
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const data = JSON.parse(responseData);
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              answer: data.choices[0].message.content.trim(),
            }),
          });
        } else {
          resolve({ statusCode: 500, body: "Failed to fetch the answer" });
        }
      });
    });

    req.on("error", (error) => {
      console.error(error);
      resolve({ statusCode: 500, body: "Failed to fetch the answer" });
    });

    req.write(JSON.stringify({ model: "gpt-3.5-turbo", messages }));
    req.end();
  });
};
