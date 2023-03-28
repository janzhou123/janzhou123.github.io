// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Zxx全栈攻城狮",
  tagline: "坚持学习，坚持进步",
  url: "https://janzhou123.github.io/",
  baseUrl: "/",
  favicon: "img/favicon.webp",
  organizationName: "janzhou123", // Usually your GitHub org/user name.
  projectName: "janzhou123.github.io", // Usually your repo name.
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "全部文章",
          blogSidebarCount: "ALL",
          editLocalizedFiles: false,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Zxx全栈攻城狮",
        logo: {
          alt: "博客",
          src: "img/logo.webp",
          style: { borderRadius: "50%" },
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "笔记",
          },
          {
            to: "/blog",
            label: "博客",
            position: "left",
          },
          {
            href: "https://github.com/janzhou123",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "本站",
            items: [
              {
                label: "笔记",
                to: "docs/intro",
              },
              {
                label: "博客",
                to: "blog",
              },
              {
                label: "自我介绍",
                to: "/about",
              },
              // {
              //   label: "记录生活",
              //   to: "essay",
              // },
            ],
          },
          {
            title: "我的",
            items: [
              {
                label: "Github",
                href: "https://github.com/janzhou123",
              },
              // {
              //   label: "CSDN",
              //   href: "",
              // },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "敬请期待",
                to: "/",
              },
            ],
          },
        ],
        copyright: `<p><a href="http://beian.miit.gov.cn/">湘ICP备2023005246号</a></p><p>Copyright © 2023 - PRESENT Zhouxiaoxiao Built with Docusaurus.</p>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          name: "keywords",
          content: "nestjs, reactjs, developer, Zhouxiaoxiao,full stack",
        },
      ],
    }),
};

module.exports = config;
