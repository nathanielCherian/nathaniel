import Head from "next/head";
import styles from '../styles/Home.module.css';
import { findPostBySlug } from "../utils/posts";
import { CreateTags } from ".";

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

export default function Post(props) {
    const { pageData } = props
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
                        <p style={{margin:'0',padding:'0'}}>{pageData.data.date}</p>
                    </div>
                </div>
                <div>
                    <p>Test content here.</p>
                </div>
            </div>
        </div>
    )
}