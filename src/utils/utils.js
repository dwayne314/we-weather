const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatDate = (dateObj) => {
	return dateObj.toString();
};

const getLocationData = (location) => {

	const weatherPatterns = [
		{displayText: 'Windy', frequency: 20, maxTemp: 100, minTemp: 0}, 
		{displayText: 'Sunny', frequency: 50, maxTemp: 100, minTemp: 20}, 
		{displayText: 'Cloudy', frequency: 15, maxTemp: 100, minTemp: 0}, 
		{displayText: 'Rainy', frequency: 10, maxTemp: 100, minTemp: 5}, 
		{displayText: 'Snowing', frequency: 5, maxTemp: 35, minTemp: -20}
	];

	const getWeatherFrequency = () => {
		let frequencyArray = [];
		for (let index=0; index < weatherPatterns.length; index++) {
			for (let freq=0; freq < weatherPatterns[index].frequency; freq++) {
				frequencyArray.push(weatherPatterns[index].displayText)
			}
		}
		return frequencyArray;
	};

	const getRandomTemp = (pattern) => {
		const description = weatherPatterns.find(option => option.displayText === pattern);
		const temp = getRandomInt(description.minTemp, description.maxTemp);
		return temp;
	}

	const getRandomTempRecord = (weatherFrequency, date) => {
		const randomPattern = getRandomInt(0, weatherFrequency.length - 1);
		const weatherPattern = weatherFrequency[randomPattern];
		const temp = getRandomTemp(weatherPattern);
		return {weatherPattern, temp, date: formatDate(date)};
	}

	const init = ({records=6}) => {
		let resp = [];
		const weatherFrequency = getWeatherFrequency();
		let curDate = new Date();
		for (let i=0; i < records; i++) {
			resp.push(getRandomTempRecord(weatherFrequency, curDate));
			curDate = new Date(curDate.setDate(curDate.getDate() + 1));
		}	
		return {
			city: location.city,
			state: location.state,
			forecast: resp
		};
	}

	return {
		init
	}
}

export const mockApiResponse = (location) => {
	return new Promise(resolve => {
		const mockRoute = getLocationData(location);
		window.setTimeout(() => resolve(mockRoute.init(6), 1500))
	})
};
