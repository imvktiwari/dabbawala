import React from 'react';

import classes from './Filter.module.css';

const Filter = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
    };

    return (
        <div className={classes.filter}>
            <div className={classes.filter__control}>
                {/* <label>Filter your course</label> */}
                <select value={props.selected} onChange={dropdownChangeHandler}>
                    <option value='3'>Special pack</option>
                    <option value='2'>Family pack</option>
                    <option value='1'>Basic pack</option>
                    <option value='0'>No Filter</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;