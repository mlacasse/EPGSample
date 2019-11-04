const ACTimeslotDefaultInterval = 3600; // 60 minutes
const ACTimeslotDefaultWidth = 1800 * 0.25;
const ACChannelImageDefaultWidth = 84;
const ACChannelImageDefaultHeight = 62;
const ACDefaultHeight = 94;

const ACChannelStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'grey',
  borderWidth: 1,
  height: ACDefaultHeight,
};

const ACChannelImageStyle = {
  width: ACChannelImageDefaultWidth,
  height: ACChannelImageDefaultHeight,
};

const ACTimeslotFocusStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#4DB8FF',
  borderWidth: 3,
  width: ACTimeslotDefaultWidth,
  height: ACDefaultHeight,
};

const ACTimeslotStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'grey',
  borderWidth: 1,
  width: ACTimeslotDefaultWidth,
  height: ACDefaultHeight,
};

const ACDefaultTextStyle = {
  fontSize: 20,
  color: 'grey',
};

const ACDefaultTitleTextStyle = {
  fontSize: 36,
  color: 'grey',
};

const ACDefaultBodyTextStyle = {
  fontSize: 20,
  color: 'grey',
};

export {
  ACChannelStyle,
  ACChannelImageStyle,
  ACDefaultHeight,
  ACChannelImageDefaultWidth,
  ACChannelImageDefaultHeight,
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACDefaultTextStyle,
  ACDefaultTitleTextStyle,
  ACDefaultBodyTextStyle,
};
