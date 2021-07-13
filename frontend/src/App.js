import React,{ useEffect, useState } from 'react';
import ax from './util/axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList, Bar, BarChart } from 'recharts';
import styled from 'styled-components';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from './comps/Table';

const InfoDiv = styled.div`
  display:flex;
  flex-direction: row;
`;

const ChartDiv = styled.div`
  flex: 8;
  width: 100%;
  height: 700px;
`;

const SummaryDiv = styled.div`
  flex: 1;
`;

const InputDiv = styled.div`

`;


function App() {
  const [ chartData, setChartData ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ selectedTeam, setSelectedTeam ] = useState('');
  const [ workhours, setWorkhours ] = useState('');
  const [ detail, setDetail ] = useState('');

  const getRecords = async() => {
    let records = await ax('get', 'recordgetall');
    let recordDisplay = [];
    let checkObj = {};
    for( var i = 0; i < records.length; i++ ){
      const workhours = parseFloat(records[i].hours);
      const team = records[i].team;
      const lastItem = recordDisplay[recordDisplay.length-1];
      var currentDate = new Date(records[i].date);
      currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;

      if(checkObj[currentDate]){
        lastItem[team] += workhours;
      }
      else{
        let dataObj = {
          date: currentDate,
          "Site Centre": 0,
          "Techies of Tomorrow": 0
        }
        dataObj[team] = workhours;
        recordDisplay.push(dataObj);
        console.log(recordDisplay)
        checkObj[currentDate] = true;
      }

    }
    setChartData(recordDisplay);
    setTableData(records);
  };

  useEffect(()=>{
    getRecords();
  },[]);

  const addRecord = async() => {
    let add;
    if( selectedTeam && selectedDate && workhours && detail ){
      let date = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;

      add = await ax( 'post', 'addrecord', {
        date: date,
        team: selectedTeam,
        hours: workhours,
        detail: detail
      });
      
      if( add ){
        getRecords();
        setSelectedDate(new Date());
        setSelectedTeam('');
        setWorkhours('');
        setDetail('');
      }

    }
  }

  let totalHours = 0;
  for(var i=0; i < chartData.length; i++){
    Object.keys(chartData[i]).map((k)=>{
      if(typeof chartData[i][k] === "number") totalHours += chartData[i][k];
    })
  }
  const spareTime = totalHours - chartData.length * 6;


  return (
    <div className="App">
        <InfoDiv>
          <ChartDiv>
            <ResponsiveContainer>
            <BarChart width={730} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Site Centre" fill="#82ca9d" />
              <Bar dataKey="Techies of Tomorrow" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
          </ChartDiv>
          <SummaryDiv>
            Spare time: {spareTime}
          </SummaryDiv>
        </InfoDiv>
        
        <InputDiv>
          Date: <DatePicker selected={selectedDate} onChange={(date)=> { setSelectedDate(new Date(date)) }} />
          Team: <select onClick={(e) => { setSelectedTeam(e.target.value) }}>
                  <option value='null'>TEAM</option>
                  <option value="Site Centre">Site Centre</option>
                  <option value="Techies of Tomorrow">Techies of Tomorrow</option>
                </select>
          Work hours: <input type="text" value={workhours} onChange={(e) => { setWorkhours(e.target.value) }} />
          Detail: <input type="text" value={detail} onChange={(e) => { setDetail(e.target.value) }} />
          <button onClick={addRecord}>Add</button>
        </InputDiv>

        <Table data={tableData} />
    </div>
  );
}

export default App;
