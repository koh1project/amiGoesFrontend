import { post } from './api';

const TRANSLATE_ENDPOINT = {
  post: '/recognize',
};

// export const postTranslate = async (language, image) => {
//   post(TRANSLATE_ENDPOINT.post, { language, image })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const recognize = async (image) => {
  post(TRANSLATE_ENDPOINT.post, image)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
