import { mystorage } from './localstorage.js';

const LAYOUT_STATE = 'layout_state';

export const layoutState = {
    saveState: (state) => {
        mystorage.setItem(LAYOUT_STATE, JSON.stringify(state));
    },
    getState: () => {
        let layout = {}
        try {
            layout = JSON.parse(mystorage.getItem(LAYOUT_STATE));
        } catch (error) {
            layout = {}
        }
        return layout;
    },
    clearState: () => {
        mystorage.removeItem(LAYOUT_STATE);
    }
}

