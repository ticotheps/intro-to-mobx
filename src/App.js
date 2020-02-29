import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

// Defines the context of our store using the Context API that comes with React.
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
		}
	}));

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

// Our 'BugsList' component that gives us access to the MobX 'store'
const BugsList = () => {
	const store = React.useContext(StoreContext);

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
				<BugsList />
				<BugsForm />
			</main>
		</StoreProvider>
	);
}
