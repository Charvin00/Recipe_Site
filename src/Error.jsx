import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
      <div className="error">
        <span id="error">{error}</span>
      </div>
  );
};

export default ErrorMessage;
