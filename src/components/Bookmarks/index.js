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
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date"); // date, title, tag
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const ITEMS_PER_PAGE = 20;
  
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
      setLoading(true);
      try {
        const response = await fetch("/.netlify/functions/fetchNotion");
        const data = await response.json();

        const structuredData = data.results.map((page) => ({
          title: page.properties.Name.title?.[0]?.text?.content || "Untitled",
          link: page.properties.Link.url,
          notes:
            page.properties.my_notes?.rich_text?.[0]?.text?.content || "",
          tag:
            page.properties.tag?.rich_text?.[0]?.text?.content || "",
          dateAdded: page.properties["Date Added"]?.date?.start || null,
        }));

        setBookmarks(structuredData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort bookmarks
  useEffect(() => {
    let filtered = bookmarks.filter((bookmark) =>
      filter[bookmark.tag] &&
      (bookmark.title.toLowerCase().includes(searchQuery) ||
        bookmark.notes.toLowerCase().includes(searchQuery))
    );

    // Sort bookmarks
    filtered.sort((a, b) => {
      let compareA, compareB;
      
      switch (sortBy) {
        case "title":
          compareA = a.title.toLowerCase();
          compareB = b.title.toLowerCase();
          break;
        case "tag":
          compareA = a.tag;
          compareB = b.tag;
          break;
        case "date":
        default:
          compareA = new Date(a.dateAdded || 0);
          compareB = new Date(b.dateAdded || 0);
          break;
      }
      
      if (sortOrder === "asc") {
        return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
      } else {
        return compareA > compareB ? -1 : compareA < compareB ? 1 : 0;
      }
    });

    setFilteredBookmarks(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [bookmarks, filter, searchQuery, sortBy, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookmarks = filteredBookmarks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  if (loading) {
    return (
      <div className="bg-dark-gray p-6 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading bookmarks...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-gray p-6 min-h-screen overflow-y-auto" style={{ height: '100vh' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-gray-200 mb-2">My Bookmarks</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="tag">Sort by Tag</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by tags:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filter).map(([key, value]) => (
              <button
                key={key}
                className={`py-2 px-4 text-sm font-medium rounded-full transition-all duration-200 ${
                  value
                    ? `bg-${filterColors[key]}-500 text-white hover:bg-${filterColors[key]}-600`
                    : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                }`}
                onClick={() => handleFilter(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <span className="ml-2">{value ? "✓" : ""}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookmark List */}
      {paginatedBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No bookmarks found</h3>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {paginatedBookmarks.map((bookmark, index) => (
            <Bookmark
              key={`${startIndex + index}`}
              title={bookmark.title}
              link={bookmark.link}
              notes={bookmark.notes}
              tag={bookmark.tag}
              dateAdded={bookmark.dateAdded}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 mb-8 bg-white dark:bg-gray-800 rounded-xl p-4">
          {/* Info text - stacked on small screens */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 md:mb-0 md:text-left">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredBookmarks.length)} of {filteredBookmarks.length}
          </div>
          
          {/* Navigation controls - centered and responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            
            <div className="flex space-x-1 overflow-x-auto">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors flex-shrink-0 ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white"
                        : "border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
