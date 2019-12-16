import { FormFactor } from '@youi/react-native-youi';

const ACTimeslotDefaultInterval = FormFactor.select({
  TV: 3600, // 60 minutes
  default: 900,
});

const ACTimeslotDefaultWidth = ACTimeslotDefaultInterval * 0.25;

const ACChannelImageDefaultWidth = FormFactor.select({
  TV: 84,
  default: 32,
});

const ACChannelImageDefaultHeight = FormFactor.select({
  TV: 62,
  default: 22,
});

const ACTimeslotHeaderHeight = FormFactor.select({
  TV: 47,
  default: 24,
});

const ACDefaultHeight = FormFactor.select({
  TV: 94,
  default: 48,
});

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
  fontSize: FormFactor.select({
    TV: 20,
    default: 14,
  }),
  color: 'grey',
};

const ACDefaultTitleTextStyle = {
  fontSize: 36,
  color: 'grey',
};

const ACDefaultBodyTextStyle = {
  fontSize: FormFactor.select({
    TV: 20,
    default: 14,
  }),
  color: 'grey',
};

const ACModalBodyTextStyle = {
  marginBottom: 20,
  marginTop: 20,
  fontSize: 20,
  color: 'grey',
  width: '95%',
};

export {
  ACChannelStyle,
  ACChannelImageStyle,
  ACDefaultHeight,
  ACTimeslotHeaderHeight,
  ACChannelImageDefaultWidth,
  ACChannelImageDefaultHeight,
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACDefaultTextStyle,
  ACDefaultTitleTextStyle,
  ACDefaultBodyTextStyle,
  ACModalBodyTextStyle,
};
