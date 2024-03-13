import Chat from './Chat';
import './App.css';

const title = () => {
  return (<h2 className="title">Prisonner's Dilemma</h2>)
}

const App = () => {
  return (<>{title()}<Chat /></>)
};

export default App;