import { test, expect } from '@playwright/test';

test('TypeScript basics practice', async () => {
  const userName: string = 'Sharat';
  const age: number = 32;
  const isActive: boolean = true;

  console.log(userName, age, isActive);

  expect(isActive).toBeTruthy();
  const client={

    name : 'bharaht',
    age :33,
    active : true

}
console.log(client.name)

type Client = {
  name: string;
  country: string;
  active: boolean;
};

const client2: Client = {
  name: 'Lockton',
  country: 'US',
  active: true
};

console.log(client2.country)

});


