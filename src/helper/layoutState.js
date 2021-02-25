import { mystorage } from './localstorage.js';

const LAYOUT_STATE = 'layout_state';

export const layoutState = {
    saveState: (layout, mxCount) => {
        mystorage.setItem(LAYOUT_STATE, JSON.stringify({
            layout,
            mxCount
        }));
    },
    getState: () => {
        let itemLayout = {}
        try {
            itemLayout = JSON.parse(mystorage.getItem(LAYOUT_STATE));
            if (!itemLayout) itemLayout = { layout: [], mxCount: 0 }
        } catch (error) {
            itemLayout = { layout: [], mxCount: 0 }
        }
        return itemLayout;
    },
    clearState: () => {
        mystorage.removeItem(LAYOUT_STATE);
    }
}

