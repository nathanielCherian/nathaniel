import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getSortedPostsData } from '../utils/posts';
import { TAGS } from '../utils/tags';
import { useMediaQuery } from 'react-responsive';

export async function getStaticProps() {
  const allPostsData = JSON.parse(JSON.stringify(getSortedPostsData()));
  return {
    props: {
      allPostsData
    },
  };
}

export const CreateTags = (tags) => {
  return (
    <div style={{display:'flex', flexDirection:'row', gap:'5px'}}>
      {tags.map((tag) => (
        <div
          style={{fontSize:'small', fontWeight:'normal', backgroundColor:('#'+TAGS[tag]), color:'white', width:'fit-content', padding:'2px', paddingLeft:'5px', paddingRight:'5px', borderRadius:'10px'}}
          key={tag}
          >
          {tag}
        </div>
      ))}
    </div>
  )
}


const convert_date = (date_str) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date(date_str).toLocaleDateString(undefined, options).split(',').map((dd) => dd.trim())
  return d.join(' ')
}

export default function Home( { allPostsData }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div style={{padding:'25px'}}>
        <Head>
          <title>phantasia - a blog of sorts</title>
          <meta name='description' content='phantasia, a sort of blog created by Nathaniel Cherian. Hopefully, there is interesting stuff on here. If not it will be cool to look back on this in the future. Warning, the writing may be terrible, proceed at your own risk.' />
        </Head>

          <h1 style={{marginBottom:'20px', marginTop:0, padding:'0'}}>Recent Posts</h1>
          <div style={{display:'flex', flexDirection:'column', gap:'10px', maxWidth:'600px', minWidth:'300px'}}>
            {
              allPostsData.map((post_data) => (
                <div key={post_data.title} style={{border: '1px solid black', borderRadius:'10px', display:'flex', flexDirection:'column', gap:'5px', padding:'13px'}}>
                  <div style={{width:'100%'}}>
                    <h3 style={{margin:'0', padding:'0', cursor:'pointer'}} onClick={()=>window.location = post_data.path}>{post_data.title}</h3>
                  </div>
                  {CreateTags(post_data.tags.split(','))}
                  <div>
                    <p style={{margin:0, padding:0}}>{post_data.summary}</p>
                  </div>
                  <div>
                    <p style={{fontSize:'small', fontStyle:'italic', margin:'0', padding:'0'}}>{convert_date(post_data.date)}</p>
                  </div>
                </div>
              ))
            }
          </div>

    
    </div>
  );
}
