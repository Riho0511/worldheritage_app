import React from 'react';

const HeritageInformation = (props) => {
    return (
        <>
            <h2>{props.heritageName}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>国名：</th>
                        <td>{props.countryName}</td>
                    </tr>
                    <tr>
                        <th>入場料：</th>
                        <td>
                            {props.entranceFee === 0 ?
                                <p>なし</p>
                            :
                                <p>{props.entranceFee} {props.unit}</p>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};

export default HeritageInformation;