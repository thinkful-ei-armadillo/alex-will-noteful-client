import React from 'react';

function BackButton(props) {
    const handleGoBack = () => {
        if (props.history.goBack.length > 1) {
            props.history.goBack();
        } else {
            props.history.push('/');
        }
    }

  return (
    <button onClick={() => handleGoBack()}>Go Back</button>
  );
}

export default BackButton;
