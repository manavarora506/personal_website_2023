import Image from "next/image";
import { MapPin } from "react-feather";
import { Detail } from "../Detail";
import { HomeData } from "../../data/HomeData";
import Chatbot from "../Chatbot";

function SectionTitle(props) {
  return (
    <h4
      className="col-span-2 text-lg font-semibold text-primary md:text-right md:text-base md:font-normal md:text-opacity-40"
      {...props}
    />
  );
}

function SectionContent(props) {
  return <div className="col-span-10" {...props} />;
}

function TableRow({ href, title, subtitle, date }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex items-center space-x-4 group"
    >
      <strong className="flex-none font-medium text-gray-900 group-hover:text-sky-500 dark:text-gray-100 dark:group-hover:text-sky-500">
        {title}
      </strong>
      <span className="w-full border-t border-gray-300 border-dashed shrink dark:border-gray-800" />
      {subtitle && (
        <span className="flex-none text-tertiary text-sm md:text-base">
          {subtitle}
        </span>
      )}
      {date && (
        <span className="flex-none font-mono text-quaternary hidden md:flex">
          {date}
        </span>
      )}
    </a>
  );
}

function SectionContainer(props) {
  return (
    <div
      className="grid items-start grid-cols-1 md:grid-cols-12 gap-3 md:gap-6"
      {...props}
    />
  );
}

export function Home() {
  return (
    <Detail.Container>
      <Detail.ContentContainer>
        {/* Avatar */}

        <div className="justify-center flex mb-6 md:ml-20">
          <Image
            src="/static/img/manav_smiling.jpeg"
            alt="manav"
            width={300}
            height={400}
            quality={100}
          />
        </div>

        <div className="pb-24 md:pb-4 space-y-12 md:space-y-16">
          {/* Bio */}
          <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <div className="prose">
                <p>
                  Hi friends, I&apos;m Manav Arora. I&apos;m a software
                  engineer,{" "}
                  <a
                    href="https://manavarora.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    writer
                  </a>
                  , and{" "}
                  <a
                    href="https://www.goodreads.com/user/show/133160408-manav-arora"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    reading enthusiast.
                  </a>
                </p>
                <p>
                  I am a software engineer at Visa and a graduate of The University of Texas at Austin
                  where I studied electrical and computer engineering. I pride
                  myself on being a fast self-learner and having excpetionally
                  strong communication skills. These days I am learning more
                  about building agents, Austrian economics, and Russian
                  literature.
                </p>
              </div>
            </SectionContent>
          </SectionContainer>

          {/* Socials */}
          <SectionContainer>
            <SectionTitle>Online</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                <TableRow
                  href={"mailto:manavarora506@gmail.com"}
                  title={"Email"}
                  subtitle={"Send"}
                  date={""}
                />
                <TableRow
                  href={"https://github.com/manavarora506"}
                  title={"GitHub"}
                  subtitle={"Browse"}
                  date={""}
                />
                <TableRow
                  href={"https://www.linkedin.com/in/manav-arora1/"}
                  title={"LinkedIn"}
                  subtitle={"Connect"}
                  date={""}
                />
                <TableRow
                  href={"https://twitter.com/manavsteel506"}
                  title={"Twitter"}
                  subtitle={"Follow"}
                  date={""}
                />
                <TableRow
                  href={
                    "https://open.spotify.com/user/31mlvzyl2jwlzr55ythn6roevhqq?si=e5c8716705bb4d80"
                  }
                  title={"Spotify"}
                  subtitle={"Listen"}
                  date={""}
                />
              </div>
            </SectionContent>
          </SectionContainer>

          {/* Work */}
          <SectionContainer>
            <SectionTitle>Work</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {HomeData.workHistory.map((job) => (
                  <TableRow
                    href={job.href}
                    title={job.title}
                    subtitle={job.subtitle}
                    date={job.date}
                    key={job.href}
                  />
                ))}
              </div>
            </SectionContent>
          </SectionContainer>

          {/* Spotify Widget */}
          <SectionContainer>
            <SectionTitle>Music</SectionTitle>
            <SectionContent>
              <iframe
                className="rounded-xl"
                src="https://open.spotify.com/embed/playlist/1PxsVdXItBPeL7MhKDNRmK?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </SectionContent>
          </SectionContainer>

          {/* Footer */}
          <SectionContainer>
            <SectionTitle></SectionTitle>
            <SectionContent>
              <div className="flex justify-center">
                <div className="prose">
                  Design inspired by{" "}
                  <a
                    href="https://www.brianlovin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Brian Lovin
                  </a>
                </div>
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  );
}
