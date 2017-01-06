import React from 'react';
import translate from '../../translate.jsx';

export const OptionMenu = translate(({strings, option, onShowChange}) => {

  return(
    <div className="option-menu">
      <div className={"selected selected--" + (option) }>
      </div>
      <div className="option" onClick={() => onShowChange(1)}>
        <div className="title">{strings.tasks.showUndone}</div>
      </div>
      <div className="line">

      </div>
      <div className="option" onClick={() => onShowChange(2)}>
        <div className="title">{strings.tasks.showBoth}</div>
      </div>
      <div className="line">

      </div>
      <div className="option" onClick={() => onShowChange(3)}>
        <div className="title">{strings.tasks.showDone}</div>
      </div>
    </div>
  );
});

