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
        plugins: []
      }
    }
  ],
};
