import { FormFactor } from '@youi/react-native-youi';

const ACTimeslotDefaultInterval = 3600; // 60 minutes

const ACTimeslotDefaultWidth = FormFactor.select({
  Handset: 225,
  default: 900,
});

const ACChannelImageDefaultWidth = FormFactor.select({
  Handset: 32,
  default: 84,
});

const ACChannelImageDefaultHeight = FormFactor.select({
  Handset: 22,
  default: 62,
});

const ACTimeslotHeaderHeight = FormFactor.select({
  Handset: 24,
  default: 47,
});

const ACDefaultHeight = FormFactor.select({
  Handset: 48,
  default: 94,
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

const ACChannelTextStyle = {
  fontSize: FormFactor.select({
    Handset: 10,
    default: 20,
  }),
  flexShrink: 1,
  color: 'grey',
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
    Handset: 14,
    default: 20,
  }),
  color: 'grey',
};

const ACDefaultTitleTextStyle = {
  fontSize: FormFactor.select({
    Handset: 18,
    default: 36,
  }),
  color: 'grey',
};

const ACDefaultBodyTextStyle = {
  fontSize: FormFactor.select({
    Handset: 12,
    default: 20,
  }),
  color: 'grey',
};

const ACModalStyle = FormFactor.select({
  Handset: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    position: 'absolute',
    top: ACDefaultHeight + ACTimeslotHeaderHeight,
  },
  default: {
    backgroundColor: 'white',
    borderColor: '#4DB8FF',
    borderWidth: 3,
    position: 'absolute',
    top: ACDefaultHeight + ACTimeslotHeaderHeight,
  }
});

const ACModalImageStyle = FormFactor.select({
  Handset: {
    width: 148,
    height: 111,
  },
  default: {
    width: 297,
    height: 223,
  },
});

const ACModalBodyTextStyle = FormFactor.select({
  Handset: {
    fontSize: 12,
    color: 'grey',
    width: '95%',
  },
  default: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    color: 'grey',
    width: '95%',
  },
});

export {
  ACChannelStyle,
  ACChannelTextStyle,
  ACChannelImageStyle,
  ACTimeslotHeaderHeight,
  ACChannelImageDefaultWidth,
  ACChannelImageDefaultHeight,
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACDefaultHeight,
  ACDefaultTextStyle,
  ACDefaultTitleTextStyle,
  ACDefaultBodyTextStyle,
  ACModalBodyTextStyle,
  ACModalImageStyle,
  ACModalStyle,
};
