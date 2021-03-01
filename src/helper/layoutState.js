import API from 'helper/api';


export const layoutState = {
	saveState: (layout, mxCount, itemProps) => {
		return API.post('/api/layout', {
			layout,
			mxCount,
			itemProps
		})
	},
	getState: async () => {
		const getInitLayout = () => {
			return { layout: [], mxCount: 0, itemProps: {} };
		}

		let itemLayout = null;
		try {
			itemLayout = await API.get('/api/layout')
		} catch (error) { }
		if (!itemLayout) itemLayout = getInitLayout();
		return itemLayout;
	},
	clearState: async () => {
		return await API.delete('/api/layout')
	}
}

