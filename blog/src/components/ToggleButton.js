import React from 'react';
import * as ToggleButtonStyles from './togglebutton.module.css';

const ToggleButton = ({selected, toggleSelected}) => {

    return (
        <div className={ToggleButtonStyles.toggle_container} onClick={toggleSelected}>

            <div className={`${ToggleButtonStyles.dialog_button} ${selected ? "" : ToggleButtonStyles.disabled} `}>
                {selected ? <span>🌙</span> : <span>☀️</span>}
            </div>
        </div>
    )
}

export default ToggleButton;