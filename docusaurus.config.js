// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spacetime Docs',
  tagline: 'Spacetime is the decentralized storage, index and query protocol for structured data.',
  url: 'https://spacetime.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'posthog-docusaurus'
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Spacetime Docs',
        logo: {
          alt: 'Spacetime Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://spacetime.xyz',
            label: 'Home',
            position: 'right',
          },
          {
            href: 'https://twitter.com/spacetime_xyz',
            label: 'Twitter',
            position: 'right',
          },
          {
            href: 'https://github.com/spacetimehq',
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
                label: 'Twitter',
                href: 'https://twitter.com/spacetime_xyz',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/DrXkRpCFDX',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Spacetime`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      posthog: {
        apiKey: "phc_DBZY8MbRdRIIwSwX4ZSwTAjy5ogdQPDMVdPObOuQQf",
        // appUrl: "https://docs.spacetime.xyz",  // optional
        enableInDevelopment: false  // optional
      }
    }),
};

module.exports = config;
