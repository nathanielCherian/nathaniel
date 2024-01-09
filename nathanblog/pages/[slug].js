import Head from "next/head";
import styles from '../styles/Home.module.css';
import { findPostBySlug } from "../utils/posts";
import { CreateTags } from ".";
import Markdown from 'markdown-to-jsx'
import { useEffect, useState } from "react";
import Gist from 'react-gist';

export function getServerSideProps(context) {
    const { slug } = context.query;
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
                <title>Nathan's Blog | {pageData.data.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{maxWidth:'650px', minWidth:'300px', display:'flex', flexDirection:'column', gap:'15px'}}>
                <h1 style={{margin:'0', padding:'0'}}>{pageData.data.title}</h1>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div>
                        {CreateTags(pageData.data.tags.split(','))}
                    </div>
                    <div>
                        <p style={{margin:'0',padding:'0'}}>{convert_date(pageData.data.date)}</p>
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
            </div>
        </div>
    )
}