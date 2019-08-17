const ACTimeslotDefaultInterval = 1800; // 30 minutes
const ACTimeslotDefaultWidth = 900 * 0.25;
const ACTimeslotDefaultHeight = 42;

const ACTimeslotFocusStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'red',
  borderColor: 'black',
  borderWidth: 1,
  width: ACTimeslotDefaultWidth,
  height: ACTimeslotDefaultHeight,
};

const ACTimeslotStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  borderColor: 'black',
  borderWidth: 1,
  width: ACTimeslotDefaultWidth,
  height: ACTimeslotDefaultHeight,
};

const baseTextStyle = {
  fontSize: 12,
  color: 'white',
};

export {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACTimeslotDefaultHeight,
  baseTextStyle
};
