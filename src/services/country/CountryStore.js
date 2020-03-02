import {
	observable,
	runInAction, // inlines an action with another function
	decorate // prevents the need to use decorators to decorate functions
} from 'mobx';
import CountryService from './CountryService';

class CountryStore {
	constructor() {
		this.countryService = new CountryService();
	}
	countryData = {
		model: []
	};
	status = 'initial';
	searchQuery = '';

	getExamplesAsync = async () => {
		try {
		} catch (error) {
			runInAction(() => {
				this.status = 'error';
			});
		}
	};

	createExampleAsync = async model => {
		try {
		} catch (error) {
			runInAction(() => {
				this.status = 'error';
			});
		}
	};

	updateExampleAsync = async vehicle => {
		try {
		} catch (error) {
			runInAction(() => {
				this.status = 'error';
			});
		}
	};

	deleteExampleAsync = async id => {
		try {
		} catch (error) {
			runInAction(() => {
				this.status = 'error';
			});
		}
	};

	decorate(ExampleStore, {
		exampleData: observable,
		searchQuery: observable,
		status: observable
	});
}

export default new ExampleStore();
