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
    location: {} as any,
    folder: [] as any[],
    hashtag: [] as string[],
    usertag: [] as any[]
  },
  effects_UNSTABLE: [persistAtom],
});

export default postFormState;