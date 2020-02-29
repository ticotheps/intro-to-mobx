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
		bugs: ['Centipede'],
		addBug: bug => {
			store.bugs.push(bug);
		},
		// A 'computed value/property' is a READ-only function that essentially
		// 'gets' (or returns) a value for us that is derived from state.
		// Because this is essentially a 'getter' function, we don't actually
		// have to CALL the function, but we can access it like a property or
		// attribute of a class.
		get bugsCount() {
			return store.bugs.length;
		}
	}));

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

// Our 'BugsHeader' component that gives us access to the total # of bugs in
// our 'bugs' array in the MobX 'store'
const BugsHeader = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	return useObserver(() => <h1>Total Number of Bugs: {store.bugsCount}</h1>);
};

// Our 'BugsList' component that gives us access to the MobX 'store'
const BugsList = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);

	// The 'useObserver' hook allows MobX to watch this <BugsList /> component
	// for any changes and will AUTOMATICALLY re-render when it notices a change.
	return useObserver(() => (
		<ul>
			{store.bugs.map(bug => (
				<li key={bug}>{bug}</li>
			))}
		</ul>
	));
};

// Our 'BugsForm' component that allows us to add new bugs to the MobX 'store'
// object inside of the 'StoreProvider()' function.
const BugsForm = () => {
	// This allows for access to the MobX 'store' through the 'StoreContext'
	const store = React.useContext(StoreContext);
	const [bug, setBug] = React.useState('');

	return (
		<form
			onSubmit={e => {
				// adds the 'bug' from the initial state of our <form> INTO the array
				// of 'bugs' in our MobX 'store' object.
				store.addBug(bug);
				// Resets our local state to an empty string after we add the bug
				setBug('');
				e.preventDefault();
			}}
		>
			<input
				type='text'
				value={bug}
				onChange={e => {
					setBug(e.target.value);
				}}
			/>
			<button type='submit'>Add Bug</button>
		</form>
	);
};

export default function App() {
	return (
		<StoreProvider>
			<main>
				<BugsHeader />
				<BugsList />
				<BugsForm />
			</main>
		</StoreProvider>
	);
}
