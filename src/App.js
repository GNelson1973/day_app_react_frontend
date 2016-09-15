import React from 'react';
import Days from './Days';
import DayForm from './DayForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends React.Component {
    render() {
        return (
          <MuiThemeProvider>
            <DayForm />
          </MuiThemeProvider>
        );
    }
}

export default App;
