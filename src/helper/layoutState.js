import API from 'helper/api';


export const layoutState = {
	saveState: (layout, mxCount, itemProps) => {
		API.post('/api/layout', {
			layout,
			mxCount,
			itemProps
		}).then((res) => console.log(res))
	},
	getState: async () => {
		const getInitLayout = () => {
			return { layout: [], mxCount: 0, itemProps: {} };
		}

		let itemLayout = null;
		try {
			itemLayout = await API.get('/api/layout')
			itemLayout = itemLayout.data
			console.log(itemLayout)
		} catch (error) { }
		if (!itemLayout || !itemLayout.mxCount) itemLayout = getInitLayout();
		return itemLayout;
	},
	clearState: async () => {
		return await API.delete('/api/layout')
	}
}

