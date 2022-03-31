import { open } from 'https://deno.land/x/lmdb/mod.ts';

const myDB = open({
  path: 'my-db',
  // any options go here, we can turn on compression like this:
  compression: true,
});
