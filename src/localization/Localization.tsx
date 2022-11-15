import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
    IndexScreen: {
      Discover: 'Discover',
      Connect: 'Connect',
      Profile: 'Profile',
      Translate: 'Translate',
      My_Amigoes: 'My Amigoes',
      Favorites: 'Favorites',
      HowToUse_Button: 'How to Use',
      AccountButton: 'Account',
    },
    onboarding: {
      title1: 'Welcome',
      subtitle1: 'Get Started!',
      text1:
        'amigoes is a community that connects you to other travelers who speak the same language as you.',
      title2: 'Connect',
      subtitle2: 'Make amigoes!',
      text2:
        'By setting up your choices on Connect, Amigoes will locate nearby travelers who share your interests, personality, and language.',
      text2_2:
        'You get access to their photo and phone number after receiving or being added as an amigo, so yo may schedule a call or a meeting!.',
      title3: 'Discover',
      subtitle3: 'Explore around!',
      text3:
        'On Discover, you can search interesting places around you, and add them as a Favorite, so you can access that information wherever you want.',
      title4: 'Translate',
      subtitle4: 'Read any language',
      text4:
        'Using the Translate feature, you can simply point your camera to any photo, menu, sign, or on paper, and we will translate it for you instantly.',
      title5: 'Always here',
      subtitle5: 'Explore now!',
      text5:
        'You can always come back and check this information, by clicking on How to Use.',
    },
    TranslateScreen: {
      Title: 'Translate',
      Description:
        'The following tool allows you to convert images to text. Please set the language you would like to translate to.',
      UploadPhotoDescription:
        'Transform a photo into text by uploading or taking one.',
      TakePhoto: 'Camera',
      UploadPhoto: 'Upload',
      DescriptionResults: 'The following image has been translated for you:',
    },
  },
  es: {
    IndexScreen: {
      Discover: 'Descubrir',
      Connect: 'Conectar',
      Profile: 'Perfil',
      Translate: 'Traducir',
      My_Amigoes: 'Mis Amigoes',
      Favorites: 'Favoritos',
      HowToUse_Button: 'Como Usar',
      AccountButton: 'Cuenta',
    },
    onboarding: {
      title1: 'Bienvenido',
      subtitle1: 'Comencemos!',
      text1:
        'amigoes es una comunidad que te conectará con otros viajeros que hablan el mismo idioma que tú.',
      title2: 'Conectar',
      subtitle2: 'Haz amigoes!',
      text2:
        'Al configurar tus preferencias en Conectar, Amigoes localizará viajeros cercanos que comparten tus intereses, personalidad y idioma.',
      text2_2:
        'Tendrás acceso a su foto y número de teléfono después de ser aceptado o ser agregado como amigo, ¡luego puedes programar una llamada o una reunión!.',
      title3: 'Descubrir',
      subtitle3: 'Explora a tu alrededor!',
      text3:
        'En Descubrir, puedes buscar lugares interesantes cerca de ti, y agregarlos como Favorito, para que puedas acceder a esa información donde quieras.',
      title4: 'Traducir',
      subtitle4: 'Lee cualquier idioma',
      text4:
        'Usando la función de Traducir, puedes simplemente apuntar tu cámara a cualquier foto, menú, cartel o en papel, y te traduciremos instantáneamente.',
      title5: 'Siempre aquí',
      subtitle5: 'Explora ahora!',
      text5:
        'Siempre puedes volver y revisar esta información, haciendo clic en Como Usar.',
    },
    TranslateScreen: {
      Title: 'Traducir',
      Description:
        'La siguiente herramienta le permite convertir imágenes a texto. Por favor, establezca el idioma al que le gustaría traducir.',
      UploadPhotoDescription:
        'Transforma imagen en texto subiendo o tomando una foto.',
      TakePhoto: 'Camara',
      UploadPhoto: 'Cargar',
      DescriptionResults: 'La siguiente imagen ha sido traducida para ti:',
    },
  },
});

i18n.enableFallback = true;
export default i18n;
