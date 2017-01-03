import React from 'react';
import moment from 'moment';
import _ from 'lodash';

export const CalendarNavigator = ({changeMonthAndYear, selectedMoment}) => {
  let date = selectedMoment.clone();
  let months =_.range(12).map( m => {
    return (
      <div key={m} className={"month-title" + ( date.month() === m ? " selected" : "" )} onClick={() => changeMonthAndYear(moment({month: m, year: date.year()}))}>{moment({month: m}).format('MMM')}</div>
    );
  });

  let selectedBoxStyle = {
    left: date.month()*8.33 +'%'
  };

  return (
    <div className="calendar-navigator">
        <div className="year">
          <div className="other-year prev-year" onClick={()=> changeMonthAndYear(date.add(-1, 'years'))}>{date.year()-1}</div>
          {date.year()}
          <div className="other-year next-year" onClick={()=> changeMonthAndYear(date.add(1, 'years'))}>{date.year()+1}</div>
        </div>
        <div className="months">
          {months}
          <div className="selected-box-container" style={selectedBoxStyle}>
            <div className="selected-box"></div>
          </div>
        </div>
    </div>
  );
};


export const SmallCalendarNavigator = ({changeMonthAndYear, selectedMoment}) => {
  let date = selectedMoment.clone();
  return (
    <div className="small-calendar-navigator">
      <div>
        <div className="prev-year-btn cal-btn" onClick={() => changeMonthAndYear(date.add(-1, 'years'))} ></div>
        <div className="prev-month-btn cal-btn" onClick={() => changeMonthAndYear(date.add(-1, 'months'))} ></div>
      </div>
      <div className="title">
        {date.format('MMMM')} {date.year()}
      </div>
      <div>
        <div className="next-month-btn cal-btn" onClick={() => changeMonthAndYear(date.add(1, 'months'))} ></div>
        <div className="next-year-btn cal-btn" onClick={() => changeMonthAndYear(date.add(1, 'years'))} ></div>
      </div>
    </div>
  );
};
