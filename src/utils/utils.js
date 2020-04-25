import sunny from '../static/icons/sunny.svg';
import windy from '../static/icons/windy.svg';
import snowing from '../static/icons/snowing.svg';
import raining from '../static/icons/raining.svg';
import cloudy from '../static/icons/cloudy.svg';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatDate = (dateObj) => {
	return dateObj.toString();
};

const getLocationData = (location) => {

	const weatherPatterns = [
		{displayText: 'Windy', frequency: 20, maxTemp: 70, minTemp: -10, icon:windy, alt: 'windy'}, 
		{displayText: 'Sunny', frequency: 50, maxTemp: 100, minTemp: 20, icon:sunny, alt: 'sunny'}, 
		{displayText: 'Cloudy', frequency: 15, maxTemp: 80, minTemp: 20, icon:cloudy, alt: 'cloudy'}, 
		{displayText: 'Rainy', frequency: 10, maxTemp: 90, minTemp: 30, icon:raining, alt: 'raining'}, 
		{displayText: 'Snowing', frequency: 5, maxTemp: 35, minTemp: -20, icon:snowing, alt: 'snowing'}
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

	const getIcon = (pattern) => {
		const icon = weatherPatterns.find(option => option.displayText === pattern).icon;
		return icon;
	}

	const getRandomTempRecord = (weatherFrequency, date) => {
		const randomPattern = getRandomInt(0, weatherFrequency.length - 1);
		const weatherPattern = weatherFrequency[randomPattern];
		const temp = getRandomTemp(weatherPattern);
		const icon = getIcon(weatherPattern);
		return {weatherPattern, temp, date: formatDate(date), icon};
	}

	const isTempValid = (lastTemp, currentTemp, threshold) => {
		return Math.abs(lastTemp - currentTemp) < threshold;
	}

	const init = ({records=6}) => {
		let resp = [];
		let curDate = new Date();
		const weatherFrequency = getWeatherFrequency();
		
		for (let i=0; i < records; i++) {
			const newRandomTempRecord = getRandomTempRecord(weatherFrequency, curDate);
			
			if (resp.length) {
				const lastTempRecord = resp[resp.length - 1];
				
				if (isTempValid(lastTempRecord.temp, newRandomTempRecord.temp, 10)) {
					resp.push(newRandomTempRecord);
					curDate = new Date(curDate.setDate(curDate.getDate() + 1));
				}
				else i--;
			}
			else {
				resp.push(newRandomTempRecord);
				curDate = new Date(curDate.setDate(curDate.getDate() + 1));
			}
			
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
