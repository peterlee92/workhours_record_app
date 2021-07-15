import React from 'react';
import Row from './Row';
import styled from 'styled-components';

export default function Table(props){
    const { data, isEditIn, setIsEditIn } = props;
    const columns = ['ID', 'Date', 'Team', 'Work Hours', 'Details']

    return(
        <StyledTable>
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
                        return <Row 
                                data={o} 
                                isEditIn={isEditIn} 
                                setIsEditIn={setIsEditIn} 
                                />
                    })
                }
            </tbody>
        </StyledTable>
    )
}

const StyledTable = styled.table`
    && { 
        width: 80%; 

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            border-spacing: 0;
        }

        td{
            text-align: center;
        }
    }
`;