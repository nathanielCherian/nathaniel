import * as React from "react"
import * as IndexStyles from './index.module.css';
import Navbar from '../components/Navbar';
import PageCard from '../components/PageCard';

const Index = () => {
  return (
    <div className={IndexStyles.container}>
      <Navbar/>

      <div className={IndexStyles.title}>
          <h1>👋 Hi, this is Nathaniels Blog</h1>
          <p className={IndexStyles.lead}>I'll be posting some interesting stuff here ✨</p>
      </div>

      <div className={IndexStyles.pages_container__wrapper}>
        <div className={IndexStyles.pages_container}>
          <PageCard />
          <PageCard />
        </div>
      </div>


    </div>
  )
}


export default Index;