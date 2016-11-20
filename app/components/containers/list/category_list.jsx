import React from 'react';
import _ from 'lodash';
import moment from 'moment';

export class CategoryList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let titles = _.map(this.props.events, (eventList, key) => {
      return (
        <FirstLevelList
          key={key}
          itemKey={key}
          list={eventList}
          selected={this.props.selected}
          selectionChanged={this.props.selectionChanged}
        />
      );
    });

    return (
      <div className={"side-list" + " " + this.props.eventType}>
        {titles}
      </div>
    );
  }

}

const FirstLevelList = ({itemKey, list, selected, selectionChanged}) => {
  let amount = list.values.reduce((prev, curr) => {
    return curr.values ? prev + curr.values.length : prev + 1;
  }, 0);
  return (
    <div>
      <div
        className={"first-level-title"}
        onClick={() => selectionChanged([itemKey])}
      >
        <div className="line" />
        <div className={'icon' + (selected[0] === itemKey ? " open" : "")}/>
        <div className={"title" + (selected[0] === itemKey ? " open" : "")}>
          {list.key}
        </div>
        <div className="amount">{amount}</div>
      </div>
      { selected[0] === itemKey ?
        list.values.map((value, index) => {
          return selected.length === 3 ? (
            <SecondLevelList
                key={index}
                itemKey={index}
                parentKey={itemKey}
                list={value}
                selected={selected}
                selectionChanged={selectionChanged}
              />
          ) : (
            <EventInfo
              key={index}
              isOpen={selected[1] === value._id}
              event={value}
              openEvent={() => selectionChanged([itemKey, value._id])}
            />
          );
        }) : null
      }
    </div>
  );
};


const SecondLevelList = ({itemKey, parentKey, list, selected, selectionChanged }) => {
  return(
    <div>
      <div
        className={"second-level-title"}
        onClick={() => selectionChanged([parentKey, itemKey])}
      >
        <div className="line" />
        <div className={'icon' + ( selected[1] === itemKey ? " open" : "")}/>
        <div className={"title" + (selected[1] === itemKey ? " open" : "") }>
          {list.key}
        </div>
        <div className="amount">{list.values.length}</div>
      </div>
      {  selected[1] === itemKey ?
        _.map(list.values, (event, index) => {
          return (
            <div key={index}>
              <EventInfo
                isOpen={selected[2] === event._id}
                event={event}
                openEvent={() => selectionChanged([parentKey, itemKey, event._id])}
              />
            </div>
          );
        }) : null
      }
    </div>
  );
};


const EventInfo = ({isOpen, event, openEvent}) => {
  return (
    <div className={"event-info" + (isOpen ? " open" : "")} onClick={openEvent} >
      <div className="date">
        {moment(event.createdAt).format('DD. MMMM YYYY')}
      </div>
      <div className="title">
        {event.title}
      </div>
      <div className="user">
        {event.userId.name}
      </div>
    </div>
  );
};
