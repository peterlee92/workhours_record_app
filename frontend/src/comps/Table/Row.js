import React, { useState } from 'react';
import { teamList } from '../../util/teamListt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export default function Row(props){
    const { data, isEditIn, setIsEditIn } = props;
    const [ edit, setEdit ] = useState(false);
    const [ userData, setUserData ] = useState({
        date: new Date(data['date']),
        team: data['team'],
        hours: data['hours'],
        detail: data['detail']
    })
    const dateInFormat = `${userData.date.getFullYear()}-${userData.date.getMonth()+1}-${userData.date.getDate()}`;

    const handleClickUpdate = () => {
        
    }

    const handleClickEdit = () => {
        if(!isEditIn){
            setIsEditIn(true);
            setEdit(true);
        }
    }

    const handleClickCancel = () => {
        setIsEditIn(false);
        setEdit(false);
        setUserData({
            date: new Date(data['date']),
            team: data['team'],
            hours: data['hours'],
            detail: data['detail']
        })
    }

    const handleChange = ( key, data ) => {
        setUserData({
            ...userData,
            [key]: data
        })
    }

    return(
        <tr>
            {
                Object.keys(data).map((k, i) => {
                    return edit ? 
                    (
                        <td>
                            { k === 'date' ? 
                              <DatePicker selected={userData.date} onChange={( date )=>{  }} /> :
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
                              <StyledTextField value={userData[k]} variant="outlined" onChange={(e)=>{ handleChange( k, e.target.value ) }} />
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
            { !edit && <td><button onClick={handleClickEdit}>Edit</button></td>}
            { edit && (
                <>
                    <td>
                        <button>Update</button>
                        <button onClick={handleClickCancel}>Cancel</button>
                    </td>
                </>
            ) }
            
        </tr>
    )
}

const StyledTextField = styled(TextField)`
    && {
        text-align: center;

        input{
            padding: 5px;
        }
    }
`;