import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource : ["Vulnerabilities", "Hosts", "Software", "Services"],
      inputValue : '',
      disableFocusRipple: "false",
      hintText: "Search",
      openOnFocus: "true"
    }

  }

  onUpdateInput(inputValue) {
  }

  render() {
    const styles = {
      searchText: {
        color: '#99a2ac',
      },
    };
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource = {this.state.dataSource}
        hintText = {this.state.hintText}
        textFieldStyle = {styles.searchText}
        onUpdateInput = {this.onUpdateInput} />
      </MuiThemeProvider>
  }
}

export default Search;
