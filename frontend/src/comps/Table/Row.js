import React, { useState } from 'react';
import { teamList } from '../../util/teamListt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Row(props){
    const { data } = props;
    const [ edit, setEdit ] = useState(false);
    const [ date, setDate ] = useState(new Date(data['date']));
    let dateInFormat = new Date(data['date']);
    dateInFormat = `${dateInFormat.getFullYear()}-${dateInFormat.getMonth()+1}-${dateInFormat.getDate()}`;

    return(
        <tr>
            {
                Object.keys(data).map((k, i) => {
                    return edit ? 
                    (
                        <td>
                            { k === 'date' ? 
                              <DatePicker selected={date} onChange={( date )=>{ setDate(new Date(date)) }} /> :
                              k === 'id' ?
                              data[k] :
                              k === 'team' ?
                              (
                                  <select value={data[k]}>
                                      {
                                          teamList.map((o ,i)=>{
                                              return(
                                                  <option value={o.value}>{o.name}</option>
                                              )
                                          })
                                      }
                                  </select>
                              ) :
                              <input value={data[k]} />
                            }
                        </td>
                    ) : 
                    (
                        <td>
                            { k === 'date' ? dateInFormat : data[k] }
                        </td>
                    )
                })
            }
            { !edit && <td><button onClick={()=>{ setEdit(true) }}>Edit</button></td>}
            { edit && (
                <>
                    <td>
                        <button>Update</button>
                        <button onClick={()=>{ setEdit(false) }}>Cancel</button>
                    </td>
                </>
            ) }
            
        </tr>
    )
}