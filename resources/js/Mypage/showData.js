import React from 'react';


const ShowData = (props) => {
    return (
        <React.Fragment>
            {props.data.map((d, index) => {
                return (
                    <p key={d.name}>{index+1}. {d.name}</p>
                );
            })}
        </React.Fragment>
    );
};

export default ShowData;