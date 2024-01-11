import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function App(props) {
    const {Component, pageProps} = props;
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
      setLoaded(true)
    }, []);

    return false ? <></> : (
        <div style={{display:'flex', flexDirection:(isMobile ? 'column' : 'row')}}>
            <Head>
              <link rel="icon" href="/logo.png" />
              <meta property="og:type" content="website" />
              <meta property="og:locale" content="en_US" />
              <meta property='og:site_name' content='phantasia - a blog of sorts' />
            </Head>
            <div style={{display:'flex', padding:'15px', borderRight:'1px solid black', justifyContent:'center'}}>
                <div style={{fontWeight:'bold', marginLeft:'20px', marginTop:'15px', fontSize:'20px', cursor:'pointer', display:'flex', flexDirection:'column'}} onClick={()=>window.location = '/'}> 
                  <div style={{display:'flex', flexDirection:(isMobile ? 'row' : 'column')}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <span style={{fontSize:'30px'}}>phantasia</span> 
                      <span style={{fontSize:'15px', color:'gray', fontWeight:'1px', fontStyle:'italic'}}>... a blog of sorts </span>
                    </div>
                    <img src='/logo.png' width={isMobile ? '75px' : '200px'}/>
                  </div>
                </div>
            </div>

            <main style={{width:'100%', padding:(isMobile ? '25px' : '50px'), display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                <Component {...pageProps} />
            </main>

            <style jsx>{`
        // main {
        //   padding: 5rem 0;
        //   flex: 1;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   align-items: center;
        // }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
        </div>
    )
}