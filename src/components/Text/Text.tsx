import React from 'react';
import { TextStyle, TextProps, Text as NativeText } from 'react-native';

interface ITextProps extends TextProps {
  preset?: TextVariants,
  bold?: boolean,
  semiBold?: boolean
}

export function Text({children, preset = 'paragraphMedium', bold = false, semiBold = false, style, ...rest}: ITextProps) {

  const $fontWeight = getFontWeight(bold, semiBold);

  return (
    <NativeText style={[{color: '#000030'} ,$fontSizes[preset], $fontWeight, style]} {...rest}>
      {children}
    </NativeText>
  );
}


function getFontWeight(bold: boolean , semiBold: boolean): TextStyle {
  return bold ? {fontWeight: '700'} : semiBold ? {fontWeight: '500'} : {fontWeight: '400'};
}

type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

  export const $fontSizes: Record<TextVariants, TextStyle> = {
    headingLarge: {fontSize: 32, lineHeight: 38.4},
    headingMedium: {fontSize: 22, lineHeight: 26.4},
    headingSmall: {fontSize: 18, lineHeight: 23.4},

    paragraphLarge: {fontSize: 18, lineHeight: 25.2},
    paragraphMedium: {fontSize: 16, lineHeight: 22.4},
    paragraphSmall: {fontSize: 14, lineHeight: 19.6},

    paragraphCaption: {fontSize: 12, lineHeight: 16.8},
    paragraphCaptionSmall: {fontSize: 10, lineHeight: 14},
  };

