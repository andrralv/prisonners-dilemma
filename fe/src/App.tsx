import React from 'react';
import Chat from './Chat';
import './App.css';

type Props = {}

const title: React.FC<Props> = () => {
  return (<h2 className="title">Prisoner's Dilemma</h2>)
}

const App = () => {
  return (<>{title()}<Chat /></>)
};

export default App;