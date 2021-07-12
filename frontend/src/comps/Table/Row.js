import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Row(props){
    const { data } = props;
    const [ edit, setEdit ] = useState(false);
    const [ date, setDate ] = useState(new Date(data['date']));

    return(
        <tr>
            {
                Object.keys(data).map((k, i) => {
                    return edit ? 
                    (
                        <td>
                            {k === 'date' && <DatePicker selected={date} onChange={(date)=>{ setDate(date) }} />}
                        </td>
                    ) : 
                    (
                        <td>
                            {data[k]}
                        </td>
                    )
                })
            }
            { !edit && <td><button onClick={()=>{ setEdit(true) }}>Edit</button></td>}
            { edit && (
                <>
                <td><button>Update</button></td>
                <td><button onClick={()=>{ setEdit(false) }}>Cancel</button></td>
                </>
            ) }
            
        </tr>
    )
}