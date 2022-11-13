import { atom } from 'recoil';
import { UserAtom } from '../types/atom';

const user = atom<UserAtom>({
  key: 'user',
});
