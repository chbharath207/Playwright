


let name: string = 'bharath';
let reversedName: string = reverseString(name);

console.log(`Original name: ${name}`);
console.log(`Reversed name: ${reversedName}`);

function reverseString(str: string): string {
  return str.split('').reverse().join('');
}