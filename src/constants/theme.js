import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');


export const COLORS = {
    //base
    black: '#000000',
    lighterBlack: '#171717',
    white: '#ffffff',
    lighterGray: '#f2f2f2',
    lightGray: '#e7eaf1',
    gray: '#bec1d2',
    darkGray: '#858c9a',
    darkerGray: '#707070',
    peach: '#d34b49',
    red: '#772e2e',
    lightRed: '#d5374f',
    lighterRed: '#b83047',
    scarlet: '#fc030f',
    darkRed: '#6c2c2c',
    darkerRed: '#572020',
    yellow: '#cea444',
    orange: '#ad7906',
    lightBlue: '#389a96',
    blue: '#357aa6',
    darkBlue: '#1d599f',
    salad: '#299103',
    lightGreen: '#217a00',
    green: '#34600a',
    darkGreen: '#008159',
    lightPurple: '#8a3e9f',
    purple: '#67287a',
    darkPurple: '#481b59',
    brown: '#503f15',
};

export const SIZES = {
    // global
    base: 8,
    baseMargin: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,
    borderRadiusBig: 30,

    // fonts
    largeText: 50,
    h1: 40,
    h2: 26,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    width,
    height
};

const appTheme = {COLORS, SIZES};

export default appTheme;
