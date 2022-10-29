import { atom } from 'recoil';

export const UserAtom = atom<UserAtom>({
  key: 'userAtom',
  default: {
    id: null,
    email: null,
  },
});
