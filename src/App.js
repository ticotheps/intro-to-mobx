import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

// Defines the context of our store using Context API that comes with React.
// This prevents the need to 'prop drill' down so many levels because each
// component gets access to the MobX 'store'
const StoreContext = React.createContext();

// Wraps around all of the components in this app.
const StoreProvider = ({ children }) => {
	// MobX "store" does 2 things:
	// (1) A place where we store properties of state (the data we're tracking).
	// (2) Contains functions that will modify those state properties.
	const store = useLocalStore(() => ({
		hoopers: ['Chase Voelker', "D'Andre Cook"],
		addHooper: hooper => {
			store.hoopers.push(hooper);
		},
		// A 'computed value/property' is a READ-only function that essentially
		// 'gets' (or returns) a value for us that is derived from state.
		// Because this is essentially a 'getter' function, we don't actually
		// have to CALL the function, but we can access it like a property or
		// attribute of a class.
		get hoopersCount() {
			return store.hoopers.length;
		}
	}));

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

// Our 'HoopersHeader' component that gives us access to the total # of hoopers
// in our 'hoopers' array in the MobX 'store'
const HoopersHeader = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	return useObserver(() => (
		<h1>Total Number of Hoopers: {store.hoopersCount}</h1>
	));
};

// Our 'HoopersList' component that gives us access to the MobX 'store'
const HoopersList = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);

	// The 'useObserver' hook allows MobX to watch this <HoopersList /> component
	// for any changes and will AUTOMATICALLY re-render when it notices a change.
	return useObserver(() => (
		<ul>
			{store.hoopers.map(hooper => (
				<li key={hooper}>{hooper}</li>
			))}
		</ul>
	));
};

// Our 'HoopersForm' component that allows us to add new hoopers to the MobX 'store'
// object inside of the 'StoreProvider()' function.
const HoopersForm = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	const [hooper, setHooper] = React.useState('');

	return (
		<form
			onSubmit={e => {
				// adds the 'hooper' from the initial state of our <form> INTO the array
				// of 'hoopers' in our MobX 'store' object.
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
