import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getSortedPostsData } from '../utils/posts';
import { TAGS } from '../utils/tags';

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


export default function Home( { allPostsData }) {
  console.log(allPostsData)

  return (
    <div>
      <Head>
        <title>Nathan's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <h1>Recent Posts</h1>
          <div style={{display:'flex', flexDirection:'column', gap:'10px', maxWidth:'600px', minWidth:'300px'}}>
            {
              allPostsData.map((post_data) => (
                <div style={{border: '1px solid black', borderRadius:'10px', display:'flex', flexDirection:'column', gap:'5px', padding:'13px'}}>
                  <div style={{width:'100%'}}>
                    <h3 style={{margin:'0', padding:'0', cursor:'pointer'}} onClick={()=>window.location = post_data.path}>{post_data.title}</h3>
                  </div>
                  {CreateTags(post_data.tags.split(','))}
                  <div>
                    <p style={{margin:0, padding:0}}>{post_data.summary}</p>
                  </div>
                  <div>
                    <p style={{fontSize:'small', fontStyle:'italic', margin:'0', padding:'0'}}>{post_data.date}</p>
                  </div>
                </div>
              ))
            }
          </div>

{/* 

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer> */}

    
    </div>
  );
}
