import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Ammar Najjar",
  tagline: "Personal Website",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://ammarnajjar.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ammarnajjar", // Usually your GitHub org/user name.
  projectName: "ammarnajjar.github.io", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/ammarnajjar/ammarnajjar.github.io/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "https://github.com/ammarnajjar.png",
    navbar: {
      title: "Ammar Najjar",
      logo: {
        alt: "Logo",
        src: "https://github.com/ammarnajjar.png",
      },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/ammarnajjar/ammarnajjar.github.io",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ammarnajjar",
              imageSrc: "/img/icon-github.svg",
              alt: "GitHub Account",
            },
            {
              label: "StackOverflow",
              href: "https://stackoverflow.com/users/3297680/ammar",
              imageSrc: "/img/icon-stackoverflow.png",
              alt: "Stack Overflow Account",
            },
            {
              label: "Youtube",
              href: "https://www.youtube.com/@chesswithammar84",
              imageSrc: "/img/icon-youtube.svg",
              alt: "Follow me on Twitter",
            },
            {
              label: "LinkedIn",
              href: "https://de.linkedin.com/in/najjarammar",
              imageSrc: "/img/icon-linkedin.svg",
              alt: "Connect on LinkedIn",
            },
            {
              label: "Xing",
              href: "https://www.xing.com/profile/Ammar_Najjar",
              imageSrc: "/img/icon-xing.svg",
              alt: "Connect on LinkedIn",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/najjarammar",
              imageSrc: "/img/icon-facebook.svg",
              alt: "Follow us on Twitter",
            },
            {
              label: "X",
              href: "https://x.com/ammarnajjar",
              imageSrc: "/img/icon-x.png",
              alt: "Follow me on X",
            },
            {
              label: "Reddit",
              href: "https://www.reddit.com/user/najjarammar",
              imageSrc: "/img/icon-reddit.svg",
              alt: "Connect on LinkedIn",
            },
            {
              label: "RSS",
              href: "https://ammarnajjar.github.io/blog/rss.xml",
              imageSrc: "/img/icon-rss.svg",
              alt: "My RSS Feed",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ammar Najjar`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
