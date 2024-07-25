import { useState } from 'react'
import './App.css'
import right from "./assets/caret-right-fill.svg"
import left from "./assets/caret-left-fill.svg"


const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

function App() {
  const [selectedDate,setSelectedDate]=useState(new Date());


  const daysInMonth =()=>{
    const daysArray = [];

    const firstDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);


    const lastDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);

    for(let i=0;i<firstDay.getDay();i++){
      daysArray.push(null);
    }

    for(let i=0;i<=lastDay.getDate();i++){
      daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i))
    }

    return daysArray;
  }

  const HandleChangeMonth=(e)=>{
    const newMonth = parseInt(e.target.value,10);
    setSelectedDate(new Date(selectedDate.getFullYear(),newMonth,1));
  };

  const HandleChangeYear=(e)=>{
    const newYear = parseInt(e.target.value,10);
    setSelectedDate(new Date(newYear,selectedDate.getMonth(),1))
  }

  const previous=()=>{
    setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1));
  }

  const next=()=>{
    setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1));
  }

  const isSameDay=(date1,date2)=>{
    return date1.getDate()===date2.getDate() && date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear();

  }

  
  return (
    <>
      <div className="calendar">
        <div className="header">
          <button onClick={previous}><img src={left} alt="" /></button>
          <select value={selectedDate.getMonth()} onChange={HandleChangeMonth}>
            {
              months.map((months,index)=>(
                <option key={index} value={index}>{months}</option>
              ))
            }
          </select>
          <select name="" id="" value={selectedDate.getFullYear()} onChange={HandleChangeYear}>
            {
              Array.from({length:150},(_,i)=>selectedDate.getFullYear()-100+i).map((year)=>(
                <option key={year} value={year}>{year}</option>
              ))
            }
          </select>
          <button onClick={next}><img src={right} alt="" /></button>
        </div>
        <div className="daysOfWeek">
          {daysOfWeek.map((day)=>(
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {daysInMonth().map((day,index)=>(
            <div key={index}  className={day?(isSameDay(day,new Date()))?"day current":"day":"empty"}>{day?day.getDate():""}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
