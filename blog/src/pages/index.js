import * as React from "react"
import { graphql } from "gatsby";
import * as IndexStyles from './index.module.css';
import SEO from '../components/seo/SEO'
import PageShell from "../components/PageShell";
import PageCard from '../components/PageCard';

const Index = ({data}) => {

  const {edges:posts} = data.allMarkdownRemark;
  console.log(posts);

  var postsRaw = [];

  posts.map((post) => {
    
    const title = post.node.frontmatter.title;
    const summary = post.node.frontmatter.summary;
    const date = post.node.frontmatter.date;
    const path = post.node.frontmatter.path;

    postsRaw.push(
      <PageCard title={title} summary={summary} date={date} link={path} key={path}/>
    )

  })

  return (
    <PageShell>
      <SEO title= {"Home"} description={"This is the blog of Nathaniel Cherian"}/>

      <div className={IndexStyles.title}>
          <h1>👋 Hi, this is Nathaniels Blog</h1>
          <p className={IndexStyles.lead}>I'll be posting some interesting stuff here ✨</p>
      </div>

      <div className={IndexStyles.pages_container__wrapper}>
        <div className={IndexStyles.pages_container}>
          {postsRaw}
        </div>
      </div>

    </PageShell>
  )
}


export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            summary
            title
            path
            date(formatString: "MM-DD-YYYY")
          }
        }
      }
    }
  }
`