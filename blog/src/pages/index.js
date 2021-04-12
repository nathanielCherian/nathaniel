import * as React from "react"
import * as IndexStyles from './index.module.css';
import PageShell from "../components/PageShell";
import PageCard from '../components/PageCard';

const Index = () => {
  return (
    <PageShell>

      <div className={IndexStyles.title}>
          <h1>👋 Hi, this is Nathaniels Blog</h1>
          <p className={IndexStyles.lead}>I'll be posting some interesting stuff here ✨</p>
      </div>

      <div className={IndexStyles.pages_container__wrapper}>
        <div className={IndexStyles.pages_container}>
          <PageCard title="This is a title" date="4-10-21" summary="This is the summary" link="/"/>
          <PageCard title="This is a title" date="4-10-21" summary="This is the summary" link="/"/>
        </div>
      </div>

    </PageShell>
  )
}


export default Index;