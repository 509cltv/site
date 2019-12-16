import React from 'react';
import animate from './Spinner.gif';
import './styles.scss';

export default () => (
  <div
    className="preloader"
  >
    <img src={animate} alt="spinner"/>
  </div>
)