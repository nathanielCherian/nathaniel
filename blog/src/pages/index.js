import * as React from "react"
import * as IndexStyles from './index.module.css';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <div className={IndexStyles.container}>
      <Navbar/>
    </div>
  )
}


export default Index;