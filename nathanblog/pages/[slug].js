import Head from "next/head";
import styles from '../styles/Home.module.css';
import { findPostBySlug, getSortedPostsData } from "../utils/posts";
import { CreateTags } from ".";
import Markdown from 'markdown-to-jsx'
import { useEffect, useState } from "react";
import Gist from 'react-gist';


export function getStaticPaths() {
    const allPostsData = JSON.parse(JSON.stringify(getSortedPostsData()));
    const paths = allPostsData.map((post) => (
        {
            params: {
                slug: post.path.slice(1)
            }
        }
    ));
    return {paths, fallback:false}
}

export function getStaticProps( { params }) {
    const { slug } = params;
    const pageData = findPostBySlug(slug);
    if (pageData) {
        return {
            props: {slug, pageData:JSON.parse(JSON.stringify(pageData))},
        }
    } 
    return {
        notFound: true
    }
}

const convert_date = (date_str) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const d = new Date(date_str).toLocaleDateString(undefined, options).split(',').map((dd) => dd.trim())
    return d.join(' ')
  }

const MyImg = (props) => {
    console.log(props)
    return (
        <div style={{width:'100%', textAlign:'center'}}>
            <img src={props.src} width={'100%'} style={{maxWidth:'400px'}}/>
        </div>
    )
}

const MyGist = (props) => {
    return (
        <div>
            <Gist id={props.id}/>
        </div>
    );
}

export default function Post(props) {
    const { pageData } = props;

    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(pageData.content)
    }, [])

    return (
        <div>
            <Head>
                <title>{"phantasia | " + pageData.data.title}</title>
                <meta name="description" content={pageData.data.summary + " | phantasia is a sort of blog by Nathaniel Cherian where I write about random stuff."} />
            
                <meta property="og:url" content={"https://blog.nathanielc.com"+pageData.data.path} />
                <meta property="og:title" content={pageData.data.title + " | phantasia"} />
                <meta property="og:description" content={pageData.data.summary + " | phantasia is a sort of blog by Nathaniel Cherian where I write about random stuff."} />
                {'og_image' in pageData.data ? 
                    <meta property="og:image" content={pageData.data.og_image} />
                    :
                    <meta property="og:image" content="/logo.png" />
                }
            </Head>

            <div style={{maxWidth:'650px', minWidth:'300px', display:'flex', flexDirection:'column', gap:'15px'}} >
                <h1 style={{margin:'0', padding:'0'}}>{pageData.data.title}</h1>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div>
                        {CreateTags(pageData.data.tags.split(','))}
                    </div>
                    <div>
                        <p style={{margin:'0',padding:'0'}}> {convert_date(pageData.data.date)}</p>
                    </div>
                </div>
                <div style={{width:'100%'}}>
                    <Markdown options={{
                        overrides: {
                            img: {
                                component: MyImg
                            },
                            Gist: {
                                component: MyGist
                            }
                        }
                    }}>
                        {content}
                    </Markdown>
                </div>
                <p>By <a href="https://nathanielc.com">Nathaniel Cherian</a></p>
            </div>
        </div>
    )
}