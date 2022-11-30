import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Header from './components/header/Header';
import GenericReportsInput from './components/generic-reports/GenericReportsInput';

function App() {
  return (
    <div>
    <Button variant="contained">Hello</Button>
    <Header/>
    <GenericReportsInput/>
    </div>
  );
}

export default App;
