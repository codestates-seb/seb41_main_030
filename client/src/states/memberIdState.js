import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "memberId",
    storage: sessionStorage,
});

export const memberIdState = atom({
    key: "memberIdState",
    default: null,
    effects_UNSTABLE: [persistAtom],
});
