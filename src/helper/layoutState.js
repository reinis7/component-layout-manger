import { mystorage } from './localStorage.js';

const LAYOUT_STATE = 'layout_state';

export const layoutState = {
	saveState: (layout, mxCount, itemProps) => {
		mystorage.setItem(LAYOUT_STATE, JSON.stringify({
			layout,
			mxCount,
			itemProps
		}));
	},
	getState: () => {
		const getInitLayout = () => {
			return { layout: [], mxCount: 0, itemProps: {} };
		}

		let itemLayout = null;
		try {
			itemLayout = JSON.parse(mystorage.getItem(LAYOUT_STATE));
		} catch (error) { }
		if (!itemLayout) itemLayout = getInitLayout();
		return itemLayout;
	},
	clearState: () => {
		mystorage.removeItem(LAYOUT_STATE);
	}
}

