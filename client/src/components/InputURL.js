import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize';
import validURL from 'valid-url';

const InputURL = ({ sendURL }) => {
  useEffect(() => {
    M.AutoInit();
  });

  const [input, setInput] = useState('');
  const [inputNote, setInputNote] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };
  const onChange1 = (e) => {
    setInputNote(e.target.value);
  };

  // handling Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validURL.isWebUri(input)) {
      sendURL({ error: 'Invalid URL', msg: 'Please Enter a Valid URL' });
    } else {
      // Call the Server with Long URL
      sendURL({url: input,note:inputNote });
      setInput('');
      setInputNote('');
    }
  };

  return (
    <div className='row'>
      <form onSubmit={onSubmit}>
        <div className='col s12'>
          <h3 className='center'>URL Shortener Application</h3>
          <div className='input-field'>
            <i className='material-icons prefix'>insert_link</i>
            <input required placeholder="Enter URL Here" type='url' className='validate' value={input} onChange={onChange} />
          </div>
          <div className='input-field'>
            <i className='material-icons prefix'>note_add</i>
            <input  placeholder="Enter Note Here" type='text' className='validate' value={inputNote} onChange={onChange1} />
          </div>
          <div className='input-field center'>
            <button className='btn waves-effect waves-light' type='submit'>
              GENERATE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default InputURL;
