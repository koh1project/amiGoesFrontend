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
    createProfileStepOneForm: {
      title: 'Your primary information',
      description:
        'Primary information is important to keep our community safe, and this is why amigoes makes it mandatory. Do not worry, all sensitive information is not stored by us, and is only used to verify your identity.',
      name: 'Name*',
      birthDate: 'Birthdate*',
      gender: 'Gender*',
      male: 'Male',
      phoneNumber: 'Phone Number*',
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
  },
  es: {
    createProfileStepOneForm: {
      title: 'Su información primaria',
      description:
        'La información primaria es importante para mantener nuestra comunidad segura, y es por eso que amigoes lo hace obligatorio. No te preocupes, toda la información sensible no se almacena por nosotros, y solo se usa para verificar su identidad.',
      name: 'Nombre*',
      birthDate: 'Fecha de nacimiento*',
      gender: 'Género*',
      male: 'Masculino',
      phoneNumber: 'Número de teléfono*',
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
  },
});

i18n.enableFallback = true;
export default i18n;
