import React from 'react';
import Row from './Row';

export default function Table(props){
    const { data } = props;
    const columns = ['ID', 'Date', 'Team', 'Work Hours', 'Details']

    return(
        <table>
            <thead>
                <tr>
                    {
                        columns.map((o, i) => {
                            return(
                                <th key={i}>
                                    {o}
                                </th>
                            )
                        } )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((o, i) => {
                        return <Row data={o} />
                    })
                }
            </tbody>
        </table>
    )
}