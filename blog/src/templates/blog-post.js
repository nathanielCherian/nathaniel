import React from 'react';
import { graphql } from "gatsby"
import * as BlogPostStyles from './blogpost.module.css';
import SEO from '../components/seo/SEO';
import PageShell from '../components/PageShell'


const Template = ({data}) => {
    
    const {markdownRemark:post} = data;

    return (
        <PageShell>
            <SEO title= {post.frontmatter.title} description={post.frontmatter.summary} image={post.frontmatter.image} twitterImage={post.frontmatter.twitterImage} ogImage={post.frontmatter.ogImage}/>

            <div className={BlogPostStyles.article_container__wrapper} >
                <article className={BlogPostStyles.article_container}>

                    <header>
                        <h1 className={BlogPostStyles.title}>{post.frontmatter.title}</h1>
                    </header>

                    <div className={BlogPostStyles.text_section__wrapper}>
                        <section className={BlogPostStyles.text_section}>
                            <p className={BlogPostStyles.attribution}> By <em>Nathaniel Cherian</em> | <em>{post.frontmatter.date}</em></p>
                            <div className={BlogPostStyles.content} dangerouslySetInnerHTML={{__html: post.html}}/>
                        </section>
                    </div>
                    
                </article>
            </div>

        </PageShell>
    )

}

export default Template;

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
        html
        frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            summary
            image
            ogImage
            twitterImage
        }
        }
    }

`;