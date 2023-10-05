import { useState } from 'react';
import Link from 'next/link';
import { ProjectData } from '../../data/ProjectData'

function Project({ name, date, tools, tagline, description, tag, links }) {
  return (
    <div className="px-2 md:px-8 py-4" id={name.replaceAll(" ", "-")}>
      {/* Name and Tag */}
      <div className="flex">
        <p className="text-3xl font-semibold max-w-max dark:text-gray-200">
          {name}
        </p>
        <div className="my-auto">
          <p className={`h-5 w-5 ml-3 rounded-sm ${tag == "Personal" ? "bg-sky-500" : tag == "School" ? "bg-violet-500" : tag == "Work" ? "bg-rose-500" : "bg-emerald-500"}`}>
          </p>
        </div>
      </div>

      {/* Tagline and Date */}
      <p className="text-xl py-1 dark:text-gray-300">
        {tagline} <b>•</b> {date}
      </p>

      {/* Tools */}
      <div className="flex flex-wrap pt-1">
        {tools.map((tool, index) => (
          <div key={index} className="border border-off-black rounded-full px-3 py-1 mr-2 mb-2 dark:border-gray-300">
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
              <a className={"bg-off-white border border-off-black hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black"}
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
  )
}

export function Projects() {
  const [filter, setFilter] = useState({
    "School": true,
    "Personal": true,
    "Work": true,
    "Research": true,
  }
  )

  const handleFilter = (tag) => {
    setFilter(prevState => ({
      ...prevState,
      [tag]: !prevState[tag]
    }))
  }


  return (
    <div>
      <div className="relative flex max-h-screen w-full flex-col overflow-y-auto scroll-smooth">
        <div className="mx-auto w-full max-w-7xl px-4 pb-52 md:px-8">
          {/* Filtering */}
          <p className="flex justify-center pt-2 sm:pt-0 pb-1 text-xl font-medium dark:text-gray-200">Filters</p>
          <div className="justify-center flex pt-2">
            <button
              className={`p-2 sm:px-4 sm:py-2 text-sm font-medium rounded ${filter['Work'] ? 'bg-rose-500 border-rose-500 text-gray-100' : 'bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white'} focus:outline-none border-2`}
              onClick={() => handleFilter("Work")}
            >
              Work
            </button>
            <button
              className={`p-2 sm:px-4 sm:py-2 mx-6 text-sm font-medium rounded ${filter['Research'] ? 'bg-emerald-500 border-emerald-500 text-gray-100' : 'bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white'} focus:outline-none border-2`}
              onClick={() => handleFilter("Research")}
            >
              Research
            </button>
            <button
              className={`p-2 sm:px-4 sm:py-2 text-sm font-medium rounded ${filter['Personal'] ? 'bg-sky-500 border-sky-500 text-gray-100' : 'bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white'} focus:outline-none border-2`}
              onClick={() => handleFilter("Personal")}
            >
              Personal
            </button>
            <button
              className={`p-2 sm:px-4 sm:py-2 mx-6 text-sm font-medium rounded ${filter['School'] ? 'bg-violet-500 border-violet-500 text-gray-100' : 'bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white'} focus:outline-none border-2`}
              onClick={() => handleFilter("School")}
            >
              School
            </button>
          </div>

          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
            {ProjectData.projectsList.map((project, index) => {
              if (filter[project.tag]) {
                return <Project
                  key={index}
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
              }
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="fixed z-10 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-90rem))] py-10 overflow-y-auto hidden 2xl:block">
          <div className="px-8">
            <ul className="text-slate-700 text-sm leading-6">
              <li className="mb-4 text-gray-900 dark:text-gray-100">
                Contents
              </li>
              {ProjectData.projectsList.map((project, index) => (
                <li key={index} className="hover:text-sky-500">
                  <Link href={`#${project.name.replaceAll(" ", "-")}`}>
                    <a className="block py-1 font-medium text-primary hover:text-sky-500">
                      {project.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}