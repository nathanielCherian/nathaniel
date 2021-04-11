import React from 'react';
import * as PageCardStyles from './pagecard.module.css';

const PageCard = () => {
    return (
        <div className={PageCardStyles.card_container}>
            <div className={PageCardStyles.date_published__wrapper}>
                <small className={PageCardStyles.date_published}>4-10-21</small>
            </div>

            <div className={PageCardStyles.all_text}>
                <h1 className={PageCardStyles.page_title}>Page Title</h1>

                <div className={PageCardStyles.summary}>
                    <p>This is the summary</p>
                </div>
            </div>


        </div>
    )
}

export default PageCard;