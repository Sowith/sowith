import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

const { persistAtom } = recoilPersist(
  {
    key: 'postForm',
    storage: sessionStorage,
  }
);

const postFormState = atom({
  key: 'data',
  default: {
    picture: [] as any,
    phrase: "",
    location: "",
    folder: [] as string[],
    hashtag: [] as string[],
    usertag: [] as string[],
  },
  effects_UNSTABLE: [persistAtom],
});

export default postFormState;