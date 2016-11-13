import React from 'react';


const TaskCheckbox = ({isDone, id}) => {

  const toggleChecked = () => {
    console.log("Not yet implemented!!");
  };

  return(
    <div className="chekbox">
      <div
        onClick={toggleChecked}
        className={"checkmark " + (isDone ? "checked" : "") } >
      </div>
    </div>
  )
};

export default TaskCheckbox;
