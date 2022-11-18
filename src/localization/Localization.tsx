import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
    Nouns: {
      Connect: 'Connect',
    },
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
    ConnectedandBlockedTabs: {
      Connected: 'Connected',
      Blocked: 'Blocked',
    },
    ConnectionsScreen: {
      SeeProfile: 'SEE PROFILE',
    },
    BlockedUsersScreen: {
      PopupWarning: 'Are you sure to unblock this user?',
      PopupDescription1: 'You can add',
      PopupDescription2:
        'as a connection again after unblocking. You will not be able to block Parsley Montana again in 48 hours.',
      PopupYes: 'YES, SEND',
      PopupNo: 'NO, GO BACK',
    },
    UserProfileScreen: {
      title: 'My Amigoes',
      ConnectedOn: 'Connected on',
      Emergency: 'EMERGENCY',
      Block: 'BLOCK',
      Language: 'Language',
      Bio: 'Bio/About',
      Hobbies: 'Hobbies',
      PhoneNumber: 'Phone Number',
      Unfriend: 'UNFRIEND',
      Text: 'TEXT/CALL',
      PopupWarning: 'Are you sure to block this user?',
      PopupYes: 'YES, SEND',
      PopupNo: 'NO, GO BACK',
    },
    EmergencyScreen: {
      title: 'My Amigoes',
      Emergency: 'Emergency',
      RadioQuestion: 'Why are you reporting ',
      Radio1: 'The person is unconscious',
      Radio2: 'This person does offensive, abusive, or illegal action',
      Radio3: 'This person needs help from his/her emergency contact person',
      Radio4: 'The person is injured',
      Radio5: 'Others',
      TextArea: 'Please write the details here.',
      TextAreaPlaceHolder: 'Please tell me what happened',
      WarningMessage:
        'amigoes will contact this person and their emergency contact if necessary.',
      GoBack: 'GO BACK',
      Send: 'SEND',
      PopupWarning: 'Are you sure to send emergency?',
      PopupYes: 'YES, SEND',
      PopupNo: 'NO, GO BACK',
    },
    createProfileStepOneForm: {
      title: 'Your primary information',
      description:
        'Primary information is important to keep our community safe, and this is why amigoes makes it mandatory. Do not worry, all sensitive information is not stored by us, and is only used to verify your identity.',
      name: 'Name',
      birthDate: 'Birthdate*',
      gender: 'Gender',
      male: 'Male',
      phoneNumber: 'Phone Number',
      emergencyContact: 'Emergency Contact*',
      relationship: 'Relationship*',
      disclaimer:
        'It is important to have a contact to call in case of emergency.',
      id: 'Government ID*',
      idDescription:
        'Before you start, please make sure you have a government issued ID.',
      verify: ' ID verification',
      disclaimerID:
        'Your ID information is important to keep our community safe. Amigoes does not store any sensitive data.',
      next: 'Next',
    },
    createProfileStepTwoForm: {
      title: 'Talk a bit about yourself',
      subtitle:
        'You can always come back to fill these information later, by clicking on Profile.',
      uploadPhoto: 'Add photo',
      languages: 'Languages',
      languagesSubtitle:
        'What languages do you speak? This is how we will match with amigoes that you can share some chit-chat',
      selectLanguages: 'Select languages',
      about: 'About',
      aboutSubtitle:
        'Talk a bit about yourself, your personality, what you like to do in your free time.',
      aboutplaceholder: 'Tell me something about yourself',
      selectHobbies: 'Select hobbies',
      back: 'Back',
      next: 'Next',
      country: 'Home Country',
      save: 'Save',
    },
    idVerification: {
      title: 'ID Verification',
      description:
        'We need to determine if the identity document is authentic and belongs to you.',
      description2:
        'Place ID on a plain dark surface and make sure all four corners are visible.',
      button1: 'Take ID Photo',
      description3:
        'Your face must be clearly visible. Avoid shadows and background lights.',
      button2: 'Take Selfie',
    },
    login: {
      email: 'Email',
      password: 'Password',
      login: 'Login',
      noAccount: 'New on Amigoes?',
      signup: 'Create an account',
    },
    signup: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signup: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Login',
    },
    ConnectScreen: {
      YourDistancePreference: 'Your distance preference',
      YourDistanceDescription:
        'Set the distance to choose which activities and AmiGoes are ready for you. You can change it anytime.',
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
    Discover: {
      title: 'Discover',
      search: 'Search',
      filter: 'Select location',
      searchPlaceholder: 'Search for a park, restaurant, etc.',
      locationTitle: 'Location',
      date: 'Select dates',
      time: 'Select time',
      from: 'From',
      to: 'To',
      clear: 'Clear',
      apply: 'Apply',
      filter: 'Filter',
      parks: 'Parks',
      restaurants: 'Restaurants',
      entretainment: 'Entretainment',
      sports: 'Sports',
      noResults: 'No results found',
      results: 'Search results',
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
    createProfileStepOneForm: {
      title: 'Su información primaria',
      description:
        'La información primaria es importante para mantener nuestra comunidad segura, y es por eso que amigoes lo hace obligatorio. No te preocupes, toda la información sensible no se almacena por nosotros, y solo se usa para verificar su identidad.',
      name: 'Nombre',
      birthDate: 'Fecha de nacimiento*',
      gender: 'Género',
      male: 'Masculino',
      phoneNumber: 'Número de teléfono',
      emergencyContact: 'Contacto de emergencia*',
      relationship: 'Relación*',
      disclaimer:
        'Es importante tener un contacto al que llamar en caso de emergencia.',
      id: 'Identificación gubernamental*',
      idDescription:
        'Antes de comenzar, asegúrese de tener una identificación emitida por el gobierno.',
      verify: ' Verificación de identificación',
      disclaimerID:
        'Su información de identificación es importante para mantener nuestra comunidad segura. Amigoes no almacena ningún dato sensible.',
      next: 'Siguiente',
    },

    createProfileStepTwoForm: {
      title: 'Cuéntanos un poco sobre ti',
      subtitle:
        'Siempre puedes volver a llenar esta información más tarde, haciendo clic en Perfil.',
      uploadPhoto: 'Agregar foto',
      languages: 'Idiomas',
      languagesSubtitle:
        '¿Qué idiomas hablas? Así es como encontraremos amigoes con los que puedas charlar',
      selectLanguages: 'Seleccionar idiomas',
      about: 'Acerca de ti',
      aboutSubtitle:
        'Cuéntanos un poco sobre ti, tu personalidad, qué te gusta hacer en tu tiempo libre.',
      aboutplaceholder: 'Cuéntame algo sobre ti',
      selectHobbies: 'Seleccionar hobbies',
      back: 'Atrás',
      next: 'Siguiente',
      country: 'País de origen',
      save: 'Guardar',
    },
    idVerification: {
      title: 'Verificación de identifidad',
      description:
        'Necesitamos determinar si el documento de identidad es auténtico y le pertenece.',
      description2:
        'Coloque la identificación en una superficie oscura plana y asegúrese de que todas las esquinas estén visibles.',
      button1: 'Tomar foto de identificación',
      description3:
        'Su cara debe ser claramente visible. Evite sombras y luces de fondo.',
      button2: 'Tomar foto de su rostro',
    },
    login: {
      email: 'Correo electrónico',
      password: 'Contraseña',
      login: 'Iniciar sesión',
      noAccount: 'Nuevo en Amigoes?',
      signup: 'Crear una cuenta',
    },
    signup: {
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      signup: 'Registrarse',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      login: 'Iniciar sesión',
    },
    Discover: {
      title: 'Descubrir',
      search: 'Buscar',
      filter: 'Selecciona ubicación',
      searchPlaceholder: 'Busca parques, restaurantes, etc.',
      locationTitle: 'Ubicación',
      date: 'Selecciona fecha',
      time: 'Selecciona hora',
      from: 'Desde',
      to: 'Hasta',
      clear: 'Resetear',
      apply: 'Aplicar',
      filter: 'Filtro',
      parks: 'Parques',
      restaurants: 'Restaurantes',
      entretainment: 'Entretenimiento',
      sports: 'Deportes',
      noResults: 'No hay resultados',
      results: 'Resultados de busqueda',
    },
  },
});

i18n.enableFallback = true;
export default i18n;
