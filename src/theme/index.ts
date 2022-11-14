import { extendTheme } from 'native-base';

export const customTheme = extendTheme({
  colors: {
    green: '#3FA8AE',
    coral: '#EE6653',
    lightgreen: '#C7F0F2',
    lightcoral: '#FFE4E0',
    light: '#F8F8F8',
    dark: '#434343',
    danger: '#EA3A3D',
    success: '#33F332',
    white: '#FFFFFF',
    gray: '"#C3C3C3"',
  },

  components: {
    Text: {
      baseStyle: {
        fontSize: '14',
        fontFamily: 'Ubuntu_400Regular',
        lineHeight: '20',
        color: 'dark',
      },
      variants: {
        h1: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: '28',
          lineHeight: '32',
        },
        h2: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '24',
          lineHeight: '28',
        },
        h3: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '20',
          lineHeight: '24',
        },
        h4: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '14',
          lineHeight: '18',
        },
        body: {
          fontFamily: 'Ubuntu_400Regular',
          fontSize: '14',
          lineHeight: '20',
          color: 'dark',
        },
        input: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '12',
          lineHeight: '16',
          color: 'dark',
        },
        screenTitle: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '24',
          lineHeight: '28',
          color: 'green',
          marginLeft: '19px',
          marginBottom: '18px',
        },
        disclaimer: {
          fontFamily: 'Ubuntu_500Medium',
          fontSize: '12',
          lineHeight: '14',
          color: 'dark',
        },
      },
    },
    Button: {
      baseStyle: {
        textAlign: 'center',
        borderRadius: '100',

        _text: {
          fontFamily: 'Ubuntu_700Bold',
          textTransform: 'uppercase',
          fontSize: '14',
          lineHeight: '14',
        },
      },
      variants: {
        primarySmall: {
          bg: 'coral',
          width: '167',
          height: '60',
          _text: {
            color: 'white',
          },
          _pressed: {
            backgroundColor: '#D75A49',
          },
        },
        primarySmallLight: {
          bg: 'white',
          opacity: 1,
          width: '167',
          height: '60',
          borderColor: 'coral',
          borderWidth: '1px',
          _text: {
            color: 'coral',
          },
          _pressed: {
            backgroundColor: 'coral',
            _text: {
              color: 'white',
            },
          },
        },
        primaryLarge: {
          bg: 'coral',
          width: '335',
          height: '60',
          _text: {
            color: 'white',
          },
          _pressed: {
            backgroundColor: '#D75A49',
          },
        },
        primaryLargeLight: {
          bg: 'white',
          width: '335',
          height: '60',
          borderColor: 'coral',
          borderWidth: '1px',
          _text: {
            color: 'coral',
          },
          _pressed: {
            backgroundColor: 'coral',
            _text: {
              color: 'white',
            },
          },
        },
        disabled: {
          bg: 'gray',
          width: '335',
          height: '60',
          _text: {
            color: 'white',
          },
        },
        menu: {
          bg: 'lightgreen',
          width: '162',
          height: '50',
          _text: {
            color: 'black',
          },
          _pressed: {
            backgroundColor: 'green',
          },
        },
        primaryCamera: {
          bg: 'coral',
          width: '120',
          height: '60',
          _text: {
            color: 'white',
          },
          _pressed: {
            backgroundColor: '#D75A49',
          },
        },
        primaryLightCamera: {
          bg: 'white',
          opacity: 1,
          width: '120',
          height: '60',
          _text: {
            color: 'coral',
          },
          _pressed: {
            backgroundColor: 'coral',
          },
        },
        cameraBigBtnLight: {
          bg: 'white',
          width: '108',
          height: '132',
          borderRadius: '6',
          borderWidth: '1',
          borderColor: 'coral',
          _text: {
            color: 'coral',
          },
          _pressed: {
            backgroundColor: 'lightcoral',
          },
        },
        cameraBigBtn: {
          bg: 'lightcoral',
          width: '108',
          height: '132',
          borderRadius: '6',
          borderWidth: '1',
          borderColor: 'coral',
          _text: {
            color: 'coral',
          },
          _pressed: {
            backgroundColor: 'white',
          },
        },
      },
    },
    Link: {
      baseStyle: {
        _text: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: '14',
          lineHeight: '14',
          color: 'coral',
        },
        _pressed: {
          color: '#D75A49',
        },
      },
    },
  },
});

type CustomThemeType = typeof customTheme;

declare module 'native-base' {
  type ICustomTheme = CustomThemeType;
}
