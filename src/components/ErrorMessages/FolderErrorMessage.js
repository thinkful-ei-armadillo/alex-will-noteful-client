import React from 'react';
import proptypes from 'prop-types';

function FolderErrorMessage(props) {
  return (
    <div className="FolderErrorMessage">{props.message}</div>
  );
}

FolderErrorMessage.propTypes = {
  message: proptypes.string
};

export default FolderErrorMessage;