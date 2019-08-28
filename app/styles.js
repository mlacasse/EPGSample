const ACTimeslotDefaultInterval = 1800; // 30 minutes
const ACTimeslotDefaultWidth = 900 * 0.25;
const ACChannelImageDefaultWidth = 84;
const ACChannelImageDefaultHeight = 62;
const ACDefaultHeight = 94;

const ACChannelStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'white',
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
  backgroundColor: 'grey',
  borderColor: 'white',
  borderWidth: 2,
  width: ACTimeslotDefaultWidth,
  height: ACDefaultHeight,
};

const ACTimeslotStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: 'white',
  borderWidth: 1,
  width: ACTimeslotDefaultWidth,
  height: ACDefaultHeight,
};

const ACDefaultTextStyle = {
  fontSize: 20,
  color: 'white',
};

const ACDefaultTitleTextStyle = {
  fontSize: 36,
  color: 'white',
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
