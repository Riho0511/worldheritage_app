import React from 'react';

const CountryInformation = (props) => {
    return (
        <>
            <table className="country_information">
                <tbody>
                    <tr>
                        <th>正式名称：</th>
                        <td>{props.officialName}</td>
                    </tr>
                    <tr>
                        <th>首都：</th>
                        <td>{props.capital}</td>
                    </tr>
                    <tr>
                        <th>通貨：</th>
                        <td>
                            {props.currencies.length === 0 ?
                                <p>なし</p>
                            :
                                props.currencies.map(currency => {
                                    return <p key={currency.id}>{currency.unit}</p>
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>時差：</th>
                        <td>{props.timeDifference}時間</td>
                    </tr>
                    <tr>
                        <th>飛行機時間：</th>
                        <td>{props.planeMovement}時間</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};

export default CountryInformation;