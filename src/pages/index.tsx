import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import React from "react";
const analysis = (
  <audio
    src="/audio/The_Three_Headed_Engineer_Architect_Chapter_Lead.mov"
    controls
  />
);

// Define the skills data
const skills = [
  "Leader Mindset",
  "Innovation & Creativity",
  "Software Architecture",
  "Software Development",
  "Analytical Skills",
  "Mentoring & Coaching",
  "Cross-Functional Collaboration",
  "Knowledge Transfer",
  "Communication",

  "Researcher Mindset",
  "Continuous Integration",
  "Agile & Scrum",
  "Microservices",
  "Algorithms",
  "Quality Management",
  "Test automation",
  "NestJS",
  ".NET Core",

  "AI Systems",
  "Scalability & Resilience",
  "Angular",
  "Python",
  "Docker",
  "Kubernetes",
  "Linux",
]; //

/**
 * Calculates the number of years and months elapsed from a given start date (in "MM.YYYY" format) until today.
 *
 * @param startDate - The start date as a string in the format "MM.YYYY".
 * @returns A string representing the elapsed time in years and months (e.g., "2 years and 3 months", "1 year", or "5 months").
 */
const monthsTillToday = (startDate: string) => {
  const [startMonth, startYear] = startDate.split(".").map(Number);
  const start = new Date(startYear, startMonth - 1); // Months are 0-indexed in JS Date
  const today = new Date();

  let months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  months = months % 12;

  if (years > 0) {
    return months > 0
      ? `${years} years and ${months} months`
      : `${years} years`;
  } else {
    return `${months} months`;
  }
};

// Define the experience data
const experiences = [
  {
    title: "Chapter Lead",
    company: "CTS EVENTIM",
    duration: `Oct. 2025 - Present (${monthsTillToday("10.2025")})`, //
    tasks: [
      "Leading the Angular chapter across squads.",
      "People development of Angular engineers (mentoring, growth, performance input).",
      "Defining and evolving frontend architecture standards, coding guidelines, and shared libraries.",
      "Facilitating knowledge sharing sessions, workshops, and mentoring Angular engineers.",
      "Driving performance, accessibility, and developer experience improvements across Angular applications.",
      "Collaborating with product and engineering leadership to align cross-squad frontend initiatives with business goals.",
    ],
  },
  {
    title: "Engineering Team Lead",
    company: "CTS EVENTIM",
    duration: `Jul. 2025 - Present (${monthsTillToday("06.2025")})`, //
    tasks: [
      "Leading a full-stack squad with end-to-end responsibility for delivery.",
      "Coaching and mentoring squad engineers.",
      "Ensuring cross-functional alignment with Product, Design, and other Engineering Leads.",
      "Advocating for outcome-driven development and responsible decision-making.",
    ],
  },
  {
    title: "Software Development Architect",
    company: "CTS EVENTIM",
    duration: `Aug. 2024 - Present (${monthsTillToday("07.2024")})`, //
    tasks: [
      "Architectural leadership of the development team.",
      "Making architectural decisions in coordination with relevant people/departments.",
      "Creation and establishment of architecture guidelines.",
      "Ensures compliance with standards and processes.",
      "Enforcing and ensuring the implementation of architectural decisions made in your own Scrum team.",
      "Allocation and coordination of technical topics as part of release planning.",
      "Creating best practices for recurring topics and for their documentation.",
    ],
  },
  {
    title: "Senior Software Development Expert",
    company: "CTS EVENTIM",
    duration: "Dec. 2023 - Aug. 2024 (9 months)", //
    tasks: [
      "Angular Front-End Client development.",
      "NestJs Backend-For-Frontend Layer development.",
      "Gitlab administrator.",
      "Deployment using Helm charts & Kubernetes.",
    ],
  },
  {
    title: "Software Development Expert",
    company: "CTS EVENTIM",
    duration: "Nov. 2018 - Dec. 2023 (5 years and 2 months)", //
    tasks: [
      "Full-Stack Developer responsibilities.",
      "Angular Front-End Client development.",
      "NestJs Backend-For-Frontend Layer development.",
      "Dotnet-core (C#) API Microservices development.",
      "Deployment using Gitlab, Docker & Kubernetes.",
    ],
  },
  {
    title: "Senior Quality Assurance Expert",
    company: "CTS EVENTIM",
    duration: "Jan. 2017 - Oct. 2018 (1 year and 10 months)", //
    tasks: [
      "Developed automated system tests (Developer role).",
      "Managed the CI integration platform (DevOps role).",
      "Quality assurance in an agile software development environment (QA role).",
    ],
  },
  {
    title: "Research Scientist",
    company: "FWBI Forschungsges.mbH",
    duration: "Oct. 2015 - Dec. 2016 (1 year and 3 months)", //
    tasks: [],
  },
  {
    title: "Academic Tutor",
    company: "University of Bremen",
    duration: "Apr. 2016 - Aug. 2016 (5 months)", //
    tasks: ["Tutor for Robotics I - Course Tutorials."],
  },
  {
    title: "Software Engineer",
    company: "Univention GmbH",
    duration: "Mar. 2014 - Sep. 2015 (1 year and 7 months)", //
    tasks: ["Developing software for the testing branch."],
  },
  {
    title: "Software Assistant, Student",
    company: "BIBA - Bremer Institut für Produktion und Logistik GmbH",
    duration: "July 2012 - Mar. 2013 (9 months)", //
    tasks: [
      "Worked with OpenCV to process images and perform motion detection and recognition.",
    ],
  },
  {
    title: "Engineer",
    company: "Syrian Insurance Company",
    duration: "Aug. 2008 - Mar. 2011 (2 years and 8 months)", //
    tasks: [
      "IT supervisor.",
      "Head of the Offers department for Health Insurance section.",
    ],
  },
  {
    title: "Doctor Assistant/ Teacher",
    company: "Al-Baath University",
    duration: "Sep. 2007 - July 2009 (1 year and 11 months)", //
    tasks: [
      "Taught Programming-1 Lab Course, Networking-2 (Java) Lab Course, and Data Acquisition for control Systems.",
    ],
  },
  {
    title: "Doctor Assistant/ Teacher",
    company: "Al-Wadi International University (WIU)",
    duration: "Sep. 2007 - July 2009 (1 year and 11 months)", //
    tasks: [
      "Taught Computer Skills (CS) Lab Course, Artificial Intelligence (AI) Lab Course, and Computer Arithmetic (CAr) Practical Course.",
    ],
  },
];

// Define the education data
const education = [
  {
    degree: "M.Sc.: Information and Automation Engineering",
    institution: "Bremen University",
    duration: "Mar. 2011 - Aug. 2015 (4 years and 6 months)", //
    focus:
      "Software Development, Machine vision, Robotics, Control Theory, Real time software design.",
  },
  {
    degree: "Bachelor: Automatic Control and Computers Engineering",
    institution: "Al-Baath University",
    duration: "Sep. 2002 - July 2007 (4 years and 11 months)", //
    focus:
      "Computer science, Automatic Control, Computer Architecture, Programming, Sensors and measurement.",
  },
];

// Define languages data
const languages = [
  { name: "English", proficiency: "Fluent" }, //
  { name: "Deutsch (German)", proficiency: "Good" }, //
  { name: "Arabisch (Arabic)", proficiency: "Native language" }, //
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container text--center">
        <img
          className={clsx("profile-pic", styles.profilePic)}
          src="https://github.com/ammarnajjar.png"
          alt="Ammar Najjar Profile Picture"
        />{" "}
        {/* Placeholder: You would need to add an actual profile picture in your static assets */}
        <h1 className="hero__title">{siteConfig.title}</h1>{" "}
        {/* "Ammar Najjar - Software Development Architect" */}
        <p className="hero__subtitle">
          Engineering Leader & Software Architect
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/#skills">
            Skills
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/#experience"
          >
            Experience
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Homepage of ${siteConfig.title}`}
      description="Explore the profile of Ammar Najjar, a Software Development Architect at CTS EVENTIM with expertise in software architecture, full-stack development, and quality assurance."
    >
      <HomepageHeader />
      <main>
        <section className="padding-vert--xl">
          <div className="container">
            <h2 className="text--center">About Me</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <p>
                  I'm an Engineering Team Lead, Angular Chapter Lead, and
                  Software Development Architect at CTS EVENTIM in Bremen,
                  Germany. I lead a full-stack squad end-to-end while driving
                  cross-squad frontend standards and mentoring engineers through
                  the Angular chapter. With a Masters in Information and
                  Automation Engineering, I bring over a decade of experience in
                  software architecture, full-stack development, and quality
                  assurance. I work with technologies like Angular, NestJS, .NET
                  Core, Docker, and Kubernetes to build scalable, maintainable
                  systems. I'm passionate about engineering excellence,
                  developer experience, and team growth. Outside of work, I
                  enjoy contributing to open source, playing chess, photography,
                  and continuous learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="analysis" className="padding-vert--xl bg--light-gray">
          <div className="container">
            <h2 className="text--center">Portfolio Audio Analysis</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className={styles.analysis}>{analysis}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="padding-vert--xl bg--light-gray">
          <div className="container">
            <h2 className="text--center">Skills & Expertise</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <ul className={styles.skillsList}>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="padding-vert--xl">
          <div className="container">
            <h2 className="text--center">Professional Experience</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                {experiences.map((exp, index) => (
                  <div key={index} className={styles.experienceItem}>
                    <h3>
                      {exp.title} | {exp.company}
                    </h3>
                    <p className="text--small text--gray">{exp.duration}</p>
                    {exp.tasks.length > 0 && (
                      <ul>
                        {exp.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="padding-vert--xl bg--light-gray">
          <div className="container">
            <h2 className="text--center">Education</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                {education.map((edu, index) => (
                  <div key={index} className={styles.educationItem}>
                    <h3>{edu.degree}</h3>
                    <p className="text--small text--gray">
                      {edu.institution} - {edu.duration}
                    </p>
                    <p>Focus areas included: {edu.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="languages" className="padding-vert--xl">
          <div className="container">
            <h2 className="text--center">Languages</h2>
            <div className="row">
              <div className="col col--8 col--offset-2">
                <ul>
                  {languages.map((lang, index) => (
                    <li key={index}>
                      <strong>{lang.name}:</strong> {lang.proficiency}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
