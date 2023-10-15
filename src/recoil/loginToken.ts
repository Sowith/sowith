import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist(
  {
    key: 'token',
    storage: sessionStorage,
  }
);

const loginToken = atom({
  key: 'uid',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export default loginToken;