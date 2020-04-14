---
title: Return a string
tags:
  - javascript
---
The other day I needed to return a string based on a piece of data returned from the server. At that moment my brain decided to create a reponse variable and use a conditional to return the correct response based on that value. It looked something like this.

## If else

```js
let response

if (data.value === 'one') {
  response = 'Response for value one'
} else if (data.value === 'two') {
  response = 'A different response for value two'
} else if (data.value == 'three') {
  response = 'Another slightly different response for value three'
}
```

Knowing that there was going to be more responses added in the near future, I tried to make it easier to read. I moved to using a switch statement.

## Switch statement

```js
let response;

switch(data.value) {
  case 'one':
    response = 'Response for value one'
    break
  case 'two':
    response = 'A different response for value two'
    break
  case 'three':
    response = 'Another slightly different response for value three'
    break
  default:
    console.log(`${data.value} not supported`)
}
```

🤔 Not much better though.

After a couple of refactors, it finally clicked to enumerate the responses instead. This resulted in less code and improved the maintainability moving forward as well.

## Enumerate the responses

```js
const RESPONSES = {
  'one': 'Response for value one',
  'two': 'A different response for value two',
  'three': 'Another slightly different response for value three'
}

const response = RESPONSES[data.value]
```

A new reponse simply requires a new key value pair instead of another conditional or switch case.
