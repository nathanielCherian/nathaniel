import React from 'react';
import { Link } from "gatsby"
import * as PageCardStyles from './pagecard.module.css';

const PageCard = (props) => {
    
    const {title, date, summary, link} = props;
    
    return (
        <Link to={link}>
            <div className={PageCardStyles.card_container}>
                <div className={PageCardStyles.date_published__wrapper}>
                    <small className={PageCardStyles.date_published}>{date}</small>
                </div>

                <div className={PageCardStyles.all_text}>
                    <h1 className={PageCardStyles.page_title}>{title}</h1>

                    <div className={PageCardStyles.summary}>
                        <p>{summary}</p>
                    </div>
                </div>


            </div>
        </Link>

    )
}

export default PageCard;