import React, { useEffect, useState } from "react";
import Link from "next/link";

function Bookmark({ title, link, notes, tag }) {
  return (
    <div className="px-2 md:px-8 py-4 h-40 shadow-md">
      {/* Title */}
      <div className="flex mb-1">
        <p className="text-2xl font-semibold max-w-max dark:text-gray-200">
          {title}
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

      {/* Notes */}
      <div className="mb-2 overflow-hidden">
        <p className="text-xl py-1 dark:text-gray-300 ">{notes}</p>
      </div>

      {/* Link */}
      <div className="mt-2 flex flex-wrap">
        <Link href={link}>
          <a
            className="bg-off-white border border-off-black hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
        </Link>
      </div>
    </div>
  );
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

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

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/.netlify/functions/fetchNotion");
        const data = await response.json();

        const structuredData = data.results.map((page) => ({
          title: page.properties.Name.title[0].text.content,
          link: page.properties.Link.url,
          notes:
            page.properties.my_notes &&
            page.properties.my_notes.rich_text[0] &&
            page.properties.my_notes.rich_text[0].text
              ? page.properties.my_notes.rich_text[0].text.content
              : "",
          tag:
            page.properties.tag.rich_text[0].text.content &&
            page.properties.tag.rich_text[0].text.content
              ? page.properties.tag.rich_text[0].text.content
              : "",
        }));

        setBookmarks(structuredData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex max-h-screen w-full flex-col overflow-y-auto scroll-smooth">
      <div className="mx-auto w-full max-w-7xl px-4 pb-52 md:px-8">
        <p className="flex justify-center pt-2 sm:pt-0 pb-1 text-xl font-medium dark:text-gray-200">
          Filters
        </p>
        <div className="justify-center flex pt-2">
          <button
            className={`p-2 sm:px-4 sm:py-2 text-sm font-medium rounded ${
              filter["work"]
                ? "bg-rose-500 border-rose-500 text-gray-100"
                : "bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white"
            } focus:outline-none border-2`}
            onClick={() => handleFilter("work")}
          >
            Work
          </button>
          <button
            className={`p-2 sm:px-4 sm:py-2 mx-6 text-sm font-medium rounded ${
              filter["research"]
                ? "bg-emerald-500 border-emerald-500 text-gray-100"
                : "bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white"
            } focus:outline-none border-2`}
            onClick={() => handleFilter("research")}
          >
            Research
          </button>
          <button
            className={`p-2 sm:px-4 sm:py-2 text-sm font-medium rounded ${
              filter["personal"]
                ? "bg-sky-500 border-sky-500 text-gray-100"
                : "bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white"
            } focus:outline-none border-2`}
            onClick={() => handleFilter("personal")}
          >
            Personal
          </button>
          <button
            className={`p-2 sm:px-4 sm:py-2 mx-6 text-sm font-medium rounded ${
              filter["school"]
                ? "bg-violet-500 border-violet-500 text-gray-100"
                : "bg-inherit bg-off-white border border-off-black dark:border-off-white text-off-black dark:text-off-white"
            } focus:outline-none border-2`}
            onClick={() => handleFilter("school")}
          >
            School
          </button>
        </div>

        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark, index) => {
            console.log(
              `Checking bookmark at index ${index} with tag: ${bookmark.tag}`
            );

            if (filter[bookmark.tag]) {
              console.log(`Rendering bookmark at index ${index}`);
              return (
                <Bookmark
                  key={index}
                  title={bookmark.title}
                  link={bookmark.link}
                  notes={bookmark.notes}
                  tag={bookmark.tag.toLowerCase()}
                />
              );
            } else {
              console.log(`Skipping bookmark at index ${index}`);
            }
          })}
        </div>

        
      </div>
    </div>
  );
}

export default Bookmarks;
