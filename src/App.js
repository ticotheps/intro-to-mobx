import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

// Defines the context of our store using Context API that comes with React.
const StoreContext = React.createContext();

// Wraps around all of the components in this app.
const StoreProvider = ({ children }) => {
	// "store": contains properties of state & functions that modify them
	const store = useLocalStore(() => ({
		hoopers: ['Chase Voelker', "D'Andre Cook"],
		addHooper: hooper => {
			store.hoopers.push(hooper);
		},
		// A 'computed value/property' is a function that derives values
		get hoopersCount() {
			return store.hoopers.length;
		}
	}));

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

const HoopersHeader = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	return useObserver(() => (
		<h1>Total Number of Hoopers: {store.hoopersCount}</h1>
	));
};

const HoopersList = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);

	// Allows MobX to watch this component for any changes and AUTO re-renders
	// with any changes.
	return useObserver(() => (
		<ul>
			{store.hoopers.map(hooper => (
				<li key={hooper}>{hooper}</li>
			))}
		</ul>
	));
};

const HoopersForm = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	const [hooper, setHooper] = React.useState('');

	return (
		<form
			onSubmit={e => {
				store.addHooper(hooper);
				// Resets our local state to an empty string after we add the hooper
				setHooper('');
				e.preventDefault();
			}}
		>
			<input
				type='text'
				value={hooper}
				onChange={e => {
					setHooper(e.target.value);
				}}
			/>
			<button type='submit'>Add Hooper</button>
		</form>
	);
};

export default function App() {
	return (
		<StoreProvider>
			<main>
				<HoopersHeader />
				<HoopersList />
				<HoopersForm />
			</main>
		</StoreProvider>
	);
}
