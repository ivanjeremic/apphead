import { open } from 'lmdb'; // or require

let myDB = open({
	path: '.domedb/databases/todolist/todos',
	// any options go here, we can turn on compression like this:
	compression: true,
});

await myDB.put('greeting', { someText: 'Hello, World!' });