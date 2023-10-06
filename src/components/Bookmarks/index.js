import React, { useEffect, useState } from "react";
import Link from "next/link";

function Bookmark({ title, link, notes, tag }) {
  return (
    <div className="px-2 md:px-8 py-4" id={title.replaceAll(" ", "-")}>
      {/* Title and Tag */}
      <div className="flex">
        <p className="text-3xl font-semibold max-w-max dark:text-gray-200">
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
        <p className="text-xl py-1 dark:text-gray-300">{notes}</p>
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

  const filterColors = {
    school: "violet",
    personal: "sky",
    work: "rose",
    research: "emerald",
  };

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

  //
  return (
    <div className="bg-dark-gray p-8">
      {/* Filtering */}
      <div className="mb-6">
        <p className="flex justify-center pt-2 pb-2 sm:pt-0 pb-1 text-2xl font-bold dark:text-gray-200">
          Filters
        </p>
        <div className="flex justify-center space-x-4">
          {Object.entries(filter).map(([key, value]) => (
            <button
              key={key}
              className={`py-2 px-6 text-sm font-medium rounded-full focus:outline-none border-2 ${
                value
                  ? `bg-${filterColors[key]}-500 text-white border-${filterColors[key]}-500`
                  : "bg-dark-gray text-white border-gray-500 hover:bg-gray-700"
              }`}
              onClick={() => handleFilter(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[80vh]">
        {bookmarks.map((bookmark, index) => {
          if (filter[bookmark.tag]) {
            return (
              <div
                key={index}
                className="bg-gray-950 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Bookmark
                  title={bookmark.title}
                  link={bookmark.link}
                  notes={bookmark.notes}
                  tag={bookmark.tag}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
