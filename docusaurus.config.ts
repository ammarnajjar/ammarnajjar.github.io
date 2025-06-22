import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ammar Najjar',
  tagline: 'Personal Website',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ammarnajjar.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ammarnajjar', // Usually your GitHub org/user name.
  projectName: 'ammarnajjar.github.io', // Usually your repo name.
	trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ammarnajjar/ammarnajjar.github.io/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'https://github.com/ammarnajjar.png',
    navbar: {
      title: 'Ammar Najjar',
      logo: {
        alt: 'Logo',
        src: 'https://github.com/ammarnajjar.png',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ammarnajjar/ammarnajjar.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              html: `
<div style="display: flex; flex-direction: column">
  <div style="display: flex; flex-direction: row; justify-content: space-between;">
  <a href="https://stackoverflow.com/users/3297680/ammar"
    ><img
      src="https://stackoverflow.com/users/flair/3297680.png"
      width="180"
      height="50"
      alt="profile for Ammar at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
      title="profile for Ammar at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
  /></a>
    <a href="https://github.com/ammarnajjar">
      <img src="img/icon-github.svg" width="30" height="30" />
    </a>
    <a href="https://www.youtube.com/@chesswithammar84">
      <img src="img/icon-youtube.svg" width="30" height="30"  />
    </a>
    <a href="https://de.linkedin.com/in/najjarammar">
      <img src="img/icon-linkedin.svg" width="30" height="30"  />
    </a>
	</div>
  <div style="display: flex; flex-direction: row; justify-content: space-between;">
    <a href="https://ammarnajjar.github.io/blog/rss.xml">
      <img src="img/icon-rss.svg" width="30" height="30"  />
    </a>
    <a href="https://www.facebook.com/najjarammar">
      <img src="img/icon-facebook.svg" width="30" height="30"  />
    </a>
    <a href="https://www.reddit.com/user/najjarammar">
      <img src="img/icon-reddit.svg" width="30" height="30"  />
    </a>
    <a href="https://x.com/ammarnajjar">
      <img src="img/logo-white.png" width="30" height="30"  />
    </a>
    <a href="https://www.xing.com/profile/Ammar_Najjar">
      <img src="img/icon-xing.svg" width="30" height="30"  />
    </a>
  </div>
</div>
`
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
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
