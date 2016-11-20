import React from 'react';

export const OptionMenu = ({option, onShowChange}) => {

  return(
    <div className="option-menu">
      <div className={"selected selected--" + (option) }>
      </div>
      <div className="option" onClick={() => onShowChange(1)}>
        <div className="title">Show undone</div>
      </div>
      <div className="line">

      </div>
      <div className="option" onClick={() => onShowChange(2)}>
        <div className="title">Show both</div>
      </div>
      <div className="line">

      </div>
      <div className="option" onClick={() => onShowChange(3)}>
        <div className="title">Show done</div>
      </div>
    </div>
  );
}

const Option = ({title, selected, onSelectedChange}) => {
  return(
    <div className="option" onClick={onSelectedChange} >
      <div className={"checkbox" + (selected ? " selected" : "" )}>
        <div className={"mark" + (selected ? " selected" : "" )}></div>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};
