'use strict';
var React = require('react-native');
var styles = require('./styles');
var Guild = require('./guild');
var GuildStore = require('../../../stores/guild.js');
var GuildActionCreator = require('../../../action_creators/guild.js');

var {
  Text,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ListView
} = React;

class GuildSelection extends React.Component {
  constructor(props) {
    super(props);
    var ds =
    this.state = {
      loadingGuilds: true,
      guilds: GuildStore.state.get('guilds').toJS(),
      dataSource: this._ds().cloneWithRows(
        GuildStore.state.get('guilds').toJS()
      )
    }
  }

  _ds() {
    return new ListView.DataSource({rowHasChanged: (r1, r2) => ['id'] !== r2['id'] });
  }

  componentDidMount() {
    GuildStore.changed.add(this.storeChanged.bind(this));
    GuildActionCreator.loadGuilds();
  }

  componentWillMount() {
    GuildStore.changed.remove(this.storeChanged.bind(this));
  }

  storeChanged() {
    this.setState({
      loadingGuilds: GuildStore.state.get('loading'),
      guilds: GuildStore.state.get('guilds').toJS(),
      dataSource: this._ds().cloneWithRows(
        GuildStore.state.get('guilds').toJS()
      )
    })
  }

  _onPickGuild(id) {
    GuildActionCreator.assignGuild(id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('image!onboarding')} style={styles.background}>
          <Text style={styles.header}>
            You have been known to associate with various guilds throughout the years
            now the time of war has come, you have to choose...
          </Text>

          <ListView dataSource={this.state.dataSource} renderRow={(guild) => {
            return <Guild params={guild} onChoose={this._onPickGuild.bind(this, guild.id)} />
          }} style={styles.list}/>
        </Image>
      </View>
    )
  }
};

module.exports = GuildSelection;
