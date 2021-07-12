import React,{ useEffect, useState } from 'react';
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
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  const data = [
    {
      "date": "2021-07-11",
      "Site Centre": 5,
      "Techis of Tomorrow": 1
    },
    {
      "date": "2021-07-12",
      "Site Centre": 3,
      "Techis of Tomorrow": 3
    },
    {
      "date": "2021-07-13",
      "Site Centre": 5,
      "Techis of Tomorrow": 1
    },
    {
      "date": "2021-07-14",
      "Site Centre": 4,
      "Techis of Tomorrow": 2
    },
    {
      "date": "2021-07-15",
      "Site Centre": 5,
      "Techis of Tomorrow": 1
    },
    {
      "date": "2021-07-16",
      "Site Centre": 4,
      "Techis of Tomorrow": 2
    },
    {
      "date": "2021-07-17",
      "Site Centre": 4,
      "Techis of Tomorrow": 3
    }
  ]

  let totalHours = 0;
  for(var i=0; i < data.length; i++){
    Object.keys(data[i]).map((k)=>{
      if(typeof data[i][k] === "number") totalHours += data[i][k];
    })
  }
  const spareTime = totalHours - data.length * 6;


  return (
    <div className="App">
        <InfoDiv>
          <ChartDiv>
            <ResponsiveContainer>
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Site Centre" fill="#82ca9d" />
              <Bar dataKey="Techis of Tomorrow" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
          </ChartDiv>
          <SummaryDiv>
            Spare time: {spareTime}
          </SummaryDiv>
        </InfoDiv>
        
        <InputDiv>
          Date: <DatePicker selected={selectedDate} onChange={(date)=>console.log(date)} />
          Team: <select>
                  <option>Site Centre</option>
                  <option>Techies of Tomorrow</option>
                </select>
          Work hours: <input type="text" />
          <button>Add</button>
        </InputDiv>

        <Table data={data} />
    </div>
  );
}

export default App;
