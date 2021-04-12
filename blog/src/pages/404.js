import * as React from "react"
import { Link } from "gatsby"
import * as ErrorPageStyles from './404.module.css';
import PageShell from '../components/PageShell';

// markup
const NotFoundPage = () => {
  return (
    <PageShell>
      <div className={ErrorPageStyles.title}>
        <h1>Whoops, this page doesn't exist</h1>
        <p className={ErrorPageStyles.gohome}>Go <Link to="/" className="underline">home</Link> instead.</p>
      </div>
    </PageShell>
  )
}

export default NotFoundPage
