import { useState } from "react";
import Link from "next/link";
import { ProjectData } from "../../data/ProjectData";
import Chatbot from "../Chatbot";

function Project({ name, date, tools, tagline, description, tag, links }) {
  return (
    <div className="px-2 md:px-8 py-4" id={name.replaceAll(" ", "-")}>
      <Chatbot />

      {/* Name and Tag */}
      <div className="flex">
        <p className="text-3xl font-semibold max-w-max dark:text-gray-200">
          {name}
        </p>
        <div className="my-auto">
          <p
            className={`h-5 w-5 ml-3 rounded-sm ${
              tag == "personal"
                ? "bg-sky-500"
                : tag == "school"
                ? "bg-violet-500"
                : tag == "work"
                ? "bg-rose-500"
                : "bg-emerald-500"
            }`}
          ></p>
        </div>
      </div>

      {/* Tagline and Date */}
      <p className="text-xl py-1 dark:text-gray-300">
        {tagline} <b>•</b> {date}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap pt-1">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="border border-off-black rounded-full px-3 py-1 mr-2 mb-2 dark:border-gray-300"
          >
            <p className="text-xs font-medium text-center text-off-black dark:text-gray-300">
              {tool}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-md text-gray-600 pb-4 dark:text-gray-400">
        {description}
      </p>

      {/* Links */}
      <div className="flex flex-wrap pt-1">
        {Object.entries(links).map(([key, value], index) => (
          <div key={index}>
            <Link href={value}>
              <a
                className={
                  "bg-off-white border border-off-black hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {key}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState({
    school: true,
    personal: true,
    work: true,
    research: true,
  });

  const handleFilter = (tag) => {
    setFilter((prevState) => ({
      ...prevState,
      [tag]: !prevState[tag],
    }));
  };

  const filterColors = {
    school: "violet",
    personal: "sky",
    work: "rose",
    research: "emerald",
  };

  return (
    <div className="bg-dark-gray p-8 projects-container">
      {/* Filtering */}
      <div className="text-center mb-6">
        <div className="p-6 rounded-xl shadow-md dark:bg-dark-gray inline-flex flex-col items-center">
          <p className="text-2xl font-bold dark:text-gray-200 mb-4">Filters</p>
          <div className="flex justify-center space-x-2">
            {Object.entries(filter).map(([key, value]) => (
              <button
                key={key}
                className={`py-2 px-6 text-sm font-medium rounded-full focus:outline-none border-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
    ${
      value
        ? `bg-${filterColors[key]}-500 text-white border-${filterColors[key]}-500 hover:bg-opacity-70 active:bg-opacity-80 active:scale-95`
        : "bg-dark-gray text-gray-500 border-gray-500 hover:bg-opacity-70 dark:text-white"
    }`}
                onClick={() => handleFilter(key)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ProjectData.projectsList.map((project, index) => {
          if (filter[project.tag]) {
            return (
              <div
                key={index}
                className="bg-gray-950 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Project
                  name={project.name}
                  date={project.date}
                  tools={project.tools}
                  tagline={project.tagline}
                  description={project.description}
                  tag={project.tag}
                  website={project.website}
                  github={project.github}
                  links={project.links}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
