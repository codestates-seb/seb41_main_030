import { atom } from "recoil";

export const questionImgState = atom({
    key: "questionImgState",
    default: {
        imgList: [],
        fail: true,
    },
});
