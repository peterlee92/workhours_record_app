import React, { useState } from 'react';
import { teamList } from '../../util/teamList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import ax from '../../util/axios';

export default function Row(props){
    const { data, isEditIn, setIsEditIn, getRecords } = props;
    const [ edit, setEdit ] = useState(false);
    const [ userData, setUserData ] = useState({
        id: data['id'],
        date: new Date(data['date']),
        team: data['team'],
        hours: data['hours'],
        detail: data['detail']
    })
    const dateInFormat = `${userData.date.getFullYear()}-${userData.date.getMonth()+1}-${userData.date.getDate()}`;

    const handleClickUpdate = async() => {
        let update = await ax( 'post', 'editrecord', userData );
        if( update ){
            setIsEditIn( false );
            setEdit( false );
            getRecords();
        }
    }

    const handleClickEdit = () => {
        if( !isEditIn ){
            setIsEditIn( true );
            setEdit( true );
        }
    }

    const handleClickCancel = () => {
        setIsEditIn( false );
        setEdit( false );
        setUserData({
            date: new Date(data['date']),
            team: data['team'],
            hours: data['hours'],
            detail: data['detail']
        });
    }

    const handleChange = ( e ) => {
        const { target:{ name, value }} = e;
        setUserData({
            ...userData,
            [name]: value
        });
        console.log(name, value)
    }

    return(
        <tr>
            {
                Object.keys(data).map((k, i) => {
                    return edit ? 
                    (
                        <td key={i}>
                            { k === 'date' ? 
                              <DatePicker selected={userData.date} onChange={( date )=>{  }} /> :
                              k === 'id' ?
                              data[k] :
                              k === 'team' ?
                              (
                                  <select name={k} key={i} value={data[k]} onChange={handleChange}>
                                      {
                                          teamList.map((o ,i)=>{
                                              return(
                                                  <option key={i} value={o.value}>{o.name}</option>
                                              )
                                          })
                                      }
                                  </select>
                              ) :
                              <StyledTextField key={i} name={k} value={userData[k]} variant="outlined" onChange={handleChange} />
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
                        <button onClick={handleClickUpdate}>Update</button>
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