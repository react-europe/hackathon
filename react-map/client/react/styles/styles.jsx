const K_WIDTH = 40;
const K_HEIGHT = 40;

let Colors = require('material-ui/lib/styles/colors');

export const LocationContainerStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  borderRadius: '50%',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  backgroundSize: '100%',
  backgroundColor: 'white'
};

export const MapContainerStyle = {
  zIndex: -1,
  position: 'absolute',
  width: '70%',
  right: 0,
  height: 700,
  paddingTop: 30,
  borderBottom: '3px solid #f44336'
};

export const CitiesContainerStyle = {
  zIndex: -1,
  position: 'absolute',
  width: '30%',
  left: 0,
  height: 700,
  paddingTop: 30,
  borderBottom: '3px solid #f44336',
  overflow: 'scroll'
}

export const cityStyle = {
  color: Colors.darkBlack,
  textTransform: 'uppercase',
  fontWeight: '500',
  fontSize: '13px'
};
export const membersStyle = {
  fontStyle: 'italic',
  fontSize: '12px'
};

