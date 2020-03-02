import {
	configure, // sets some global MobX config settings
	action,
	observable,
	runInAction, // inlines an action with another function
	flow, // uses generators and yields to run in action
	decorate // prevents the need to use decorators to decorate functions
} from 'mobx';

class WeatherStore {
	weatherData = {};

	loadWeather = city => {};
}
