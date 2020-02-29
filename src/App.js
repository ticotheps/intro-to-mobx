import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

// MobX "store" does 2 things:
// (1) A place where we store properties of state (the data we're tracking).
// (2) Contains functions that will modify those state properties.
const store = useLocalStore(() => ({
	bugs: ['Centipede']
}));

export default function App() {
	return <main>Bugs!</main>;
}
