import { atom } from "recoil";

export const selfCheckState = atom({
    key: "selfCheckState",
    default: {
        type: "",
        count: 0,
    },
});
