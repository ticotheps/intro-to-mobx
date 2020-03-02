const webApiUrl = 'http://localhost:5000/product';

class ExampleService {
	get = async urlParams => {
		const options = {
			method: 'GET'
		};
		const request = new Request(webApiUrl + '?' + urlParams, options);
		const response = await fetch(request);
		return response.json();
	};
}

export default ExampleService;
