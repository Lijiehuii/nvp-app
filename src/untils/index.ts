const date = new Date().getTime();
export const getTime = (time: number): string => {
	let t = new Date(time).getTime();
	let value: number | string = (date - t) / 1000; // 换算成秒 
	let twoMinute = 2 * 60;
	let nMinute = 60 * 60;
	let oneDay = 24 * 60 * 60;
	let oneWeek = 7 * 24 * 60 * 60;

	if (value <= twoMinute) { // 相差2分钟内
		return "刚刚";
	} else if (twoMinute <= value && value <= nMinute) { // 2分钟到1小时内分钟
		return Math.floor(value / 60) + "分钟前";
	} else if (nMinute <= value && value <= oneDay) { // 相差24小时以内
		return Math.floor(value / 60 / 60) + "小时内";
	} else if (oneDay <= value && value <= oneWeek) { // 相差7天内
		return Math.floor(value / 60 / 60 / 24) + "天前";
	} else if (oneWeek <= value) { //超过七天显示
		let data1 = new Date(time);
		let year = data1.getFullYear();
		let month = data1.getMonth() + 1;
		let day = data1.getDate();
		let time3 = year + '-' + month + '-' + day;
		return time3;
	}

	return ""
}

export const dataSet = (count: number): number | string => {
	if (count > 1000 && count < 10000) {
		let newCount: number = Math.ceil(count / 100) / 10
		if (newCount % Math.floor(newCount) === 0) {
			return newCount + ".0k"
		} else {
			return newCount + "k"
		}
	} else if (count > 10000) {
		let newCount = Math.ceil(count / 1000) / 10
		if (newCount % Math.floor(newCount) === 0) {
			return newCount + ".0w"
		} else {
			return newCount + "w"
		}
	}
	return count
}

export const duration = (du: number): string => {
	const duration: number | string = du
	let mtime: string = ''
	let min: number = Math.floor(duration / 60);
	let sec: number = duration % 60;
	return mtime = (min < 10 ? "0" + min : min) + "'" + (sec < 10 ? "0" + sec : sec) + "''"
}

export const options = [
	[{
		name: '微信',
		icon: new URL("../assets/images/share-icons/wechat.png", import.meta.url).href
	},
	{
		name: '朋友圈',
		icon: new URL('../assets/images/share-icons/wechat-moments.png', import.meta.url).href
	},
	{
		name: 'QQ',
		icon: new URL('../assets/images/share-icons/qq.png', import.meta.url).href
	},
	],
	[{
		name: '复制链接',
		icon: new URL('../assets/images/share-icons/link.png', import.meta.url).href
	},
	{
		name: '不感兴趣',
		icon: new URL('../assets/images/share-icons/unlike.png', import.meta.url).href
	},
	],
]
