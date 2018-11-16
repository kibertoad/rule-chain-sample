# rule-chain-sample

Shipment discount calculation module

## Software dependencies

You will need following dependencies installed on your computer:

* [Node.js](https://nodejs.org/) - tested with 10.10.0, but theoretically should work with any 8+ version.
* npm (comes bundled with Node.js)

## Getting started

### Installing dependencies

```shell
$ npm install
```

### Running tests

Executing all tests:
```shell
$ npm run test
```

Executing all tests with code coverage calculation:
```shell
$ npm run test-coverage
```

Executing code linting:
```shell
$ npm run lint
```

### Running application

To execute using provided sample:
```shell
npm run execute-happy-path
```

To execute using arbitrary input (replace "input/input_out_of_sequence.txt" with your path):
```shell
npm run execute input/input_out_of_sequence.txt
```
