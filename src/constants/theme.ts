import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const COLORS = {
  primary: '#2563EB',
  background: '#F1F5F9',
  white: '#FFFFFF',
  text: '#0F172A',
  lightText: '#64748B',
  border: '#CBD5E1',
  error: '#EF4444', 
  shadow: '#000000',
};

export const SIZES = {
  base: moderateScale(8),
  small: moderateScale(12),
  font: moderateScale(14),
  medium: moderateScale(16),
  large: moderateScale(18),
  extraLarge: moderateScale(24),
  
  padding: moderateScale(16),
  margin: moderateScale(16),
  radius: moderateScale(12),
};

export const SHADOWS = {
  card: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 3,
  }
};
