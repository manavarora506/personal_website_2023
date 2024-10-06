import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

function Bookmark({ title, link, notes, tag, dateAdded }) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-3 border-b border-gray-300 dark:border-gray-700">
      <div className="flex-1">
        {/* Title */}
        <Link href={link}>
          <a
            className="text-lg font-semibold dark:text-gray-200 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </Link>

        {/* Notes */}
        {notes && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {notes.length > 100 ? notes.slice(0, 100) + "..." : notes}
          </p>
        )}
      </div>

      {/* Date & Tag */}
      <div className="mt-2 md:mt-0 flex items-center space-x-4">
        {dateAdded && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(dateAdded), "MMM dd, yyyy")}
          </p>
        )}
        <div className={`h-4 w-4 rounded-full ${getTagColor(tag)}`}></div>
      </div>
    </div>
  );
}

function getTagColor(tag) {
  switch (tag) {
    case "personal":
      return "bg-sky-500";
    case "school":
      return "bg-violet-500";
    case "work":
      return "bg-rose-500";
    default:
      return "bg-emerald-500";
  }
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
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
          dateAdded: page.properties["Date Added"]?.date?.start || null,  // Extract the "Date Added" field
        }));

        setBookmarks(structuredData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="bg-dark-gray p-6">
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

      {/* Search Bar */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-md border-2 border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:outline-none mb-4"
        />
      </div>

      {/* Bookmark List */}
      <div className="max-h-[80vh] overflow-y-auto">
        {bookmarks
          .filter((bookmark) =>
            // Filter bookmarks based on search query and tag filters
            (filter[bookmark.tag] &&
              (bookmark.title.toLowerCase().includes(searchQuery) ||
                bookmark.notes.toLowerCase().includes(searchQuery)))
          )
          .map((bookmark, index) => (
            <Bookmark
              key={index}
              title={bookmark.title}
              link={bookmark.link}
              notes={bookmark.notes}
              tag={bookmark.tag}
              dateAdded={bookmark.dateAdded}
            />
          ))}
      </div>
    </div>
  );
}

export default Bookmarks;
