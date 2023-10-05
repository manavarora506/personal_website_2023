import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Nav() {
  const [isDark, setIsDark] = useState(true);

  // function toggleTheme() {
  //   if (localStorage.theme === 'light') {
  //       localStorage.theme = 'dark'
  //       document.documentElement.classList.add('dark')
  //   } else {
  //       localStorage.theme = 'light'
  //       document.documentElement.classList.remove('dark')
  //   }

  useEffect(() => {
    // Check the theme in localStorage when component mounts
    setIsDark(localStorage.theme === 'dark');
  }, []); // empty dependency array means this useEffect runs once after mounting

  function toggleTheme() {
    if (localStorage.theme === 'light' || !localStorage.theme) {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
        setIsDark(true);
    } else {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
        setIsDark(false);
    }
  }

  return (
    <nav className="flex items-center justify-between p-4 md:p-6 sticky top-0">
      <div className="flex items-center flex-shrink-0 ml-0 md:ml-4 mr-6">
        <Link href="/">
          <a className="inline-block text-primary text-xl md:text-2xl font-semibold hover:text-sky-500 font-grenette">
            Manav Arora
          </a>
        </Link>
        <button className="items-center bg-off-white ml-2 rounded dark:bg-off-black focus:outline-none" onClick={toggleTheme}>
        {isDark ? 
          // Sun Icon
          <svg width="16" height="16" strokeWidth="0.25" className="inline-block stroke-current fill-current text-off-black dark:text-off-white hover:text-sky-500 dark:hover:text-sky-500 transition duration-300" viewBox="0 0 18 18">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>
          :
          // Moon Icon
          <svg width="16" height="16" strokeWidth="0.25" className="inline-block stroke-current fill-current text-off-black dark:text-off-white hover:text-sky-500 dark:hover:text-sky-500 transition duration-300" viewBox="0 2 30 24">
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
        }
      </button>
     
      </div>
      <div className="flex items-center w-auto">
        <div className="text-sm md:text-base font-normal md:font-medium md:flex-grow">
          <Link href="/projects">
            <a className="inline-block mr-3 md:mr-8 text-primary hover:text-sky-500">
              Projects
            </a>
          </Link>
          <Link href="https://manavarora.substack.com/">
            <a target="_blank" rel="noopener noreferrer" className="inline-block mr-3 md:mr-8 text-primary hover:text-sky-500">
              Writing
            </a>
          </Link>
          <Link href="/bookmarks">
            <a className="inline-block mr-3 md:mr-8 text-primary hover:text-sky-500">
              Bookmarks
            </a>
          </Link>
          <Link href="/static/pdf/resume.pdf">
            <a target="_blank" rel="noopener noreferrer" className="inline-block mr-3 text-primary hover:text-sky-500">
              Resume
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}