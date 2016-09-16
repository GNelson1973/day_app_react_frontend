import React from 'react';
import Days from './Days';
import DayForm from './DayForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
    render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <div>
              <AppBar title="My DayApp" />
            </div>
            <div>
              <DayForm />
            </div>
          </div>
          </MuiThemeProvider>
        );
    }
}

export default App;
