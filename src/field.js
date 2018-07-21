import React from 'react';

var Field = ({ label, value, onChange, name, error, type }) => <div className="field">
  <label>{ label }</label>
  <input type={ type } value={ value } name={ name } onChange={ onChange } />
  { error ? <div className="error">{ error.message }</div> : null }
</div>

export default Field;
