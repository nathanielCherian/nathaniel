module.exports = {
  siteMetadata: {
    title: "Blog | Nathaniel Cherian",
    titleTemplate: "%s · Blog | Nathaniel Cherian",
    description:
      "This is the blog of Nathaniel Cherian.",
    url: "https://blog.nathanielc.com", // No trailing slash allowed!
    siteUrl: "https://blog.nathanielc.com", // No trailing slash allowed!
    image: "/images/icon.png", // Path to your image you placed in the 'static' folder
    ogImage: "/images/icon_og.png", // Path to your image you placed in the 'static' folder
    twitterImage: "/images/icon_twitter.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@nathanielCheria",
  },

  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `./src/fonts/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: false,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
      }
    },

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-72HVMVR7Q3', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
        },
      },
    },
  ],
};
