import { mystorage } from './localstorage.js';

const LAYOUT_STATE = 'layout_state';

export const layoutState = {
    saveState: (state) => {
        mystorage.setItem(LAYOUT_STATE, state);
    },
    getState: () => {
        return mystorage.getItem(LAYOUT_STATE);
    },
    clearState: () => {
        mystorage.removeItem(LAYOUT_STATE);
    }
}

