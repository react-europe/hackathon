'use strict';

import React from 'react-native';
import MeetupsStore from './meetupsStore';
// import { Navigation } from './nav';

let { AppRegistry, StatusBarIOS, Text, View, StyleSheet, ListView } = React;
let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class ReactPeeps extends React.Component {

  constructor(){
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {messages: ds.cloneWithRows(["d123", "323"])};
  }

  onChange() {
    this.setState({messages: this.state.messages.cloneWithRows(MeetupsStore.getEvents())});
  }

  componentDidMount(){
    console.log("mounted");
    MeetupsStore.on('change', this.onChange.bind(this));
  }
  componentWillMount(){
    StatusBarIOS.setStyle('light-content');
  }

  renderMeetupRow(row){
    return (
      <Text>{row.name}</Text>
    );
  }

  render() {
    console.log({messages: this.state.messages});
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Peeps!
        </Text>
        <Text style={styles.instructions}>
          React Meetups from all around the world
        </Text>
        <ListView
          dataSource={this.state.messages}
          renderRow={this.renderMeetupRow}
        />

      </View>
    );
  }
}


AppRegistry.registerComponent('reactpeeps', () => ReactPeeps);
