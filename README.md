# ts-tram-saga
Write tram style code in TypeScript. Define clear steps to fulfill a conditional and asynchronous transaction.
Inspired by https://github.com/eventuate-tram/eventuate-tram-sagas

## Usage
```ts
import { Builder } from '../../src/builder'
import { exec } from '../../src/runner'
```

## Define a Saga
Create Order Example
see https://github.com/guAnsunyata/ts-tram-saga/tree/master/example

Example Spec:
- Create order with idle state.
- If the transaction failed, run a compensation to reject the order.
- Request to Reserve Credit through a Promise
  - If it return `CustomerNotFound` or `CustomerCreditLimitExceeded` result, run corresponded handler and fail this transaction
  - If it resolve without Promise rejection. Approve the order.

```ts
const transaction = new Builder()
.step()
  .invoke(this.createOrder.bind(this))
  .withCompensation(this.createOrderCompensation.bind(this))
.step()
  .invoke(this.reserveCredit.bind(this))
  .onReply(CustomerNotFound, this.handleCustomerNotFound.bind(this))
  .onReply(CustomerCreditLimitExceeded, this.handleCustomerCreditLimitExceeded.bind(this))
.step()
  .invoke(this.approveOrder.bind(this))
.get()

// execute the saga defined above
await exec({
  steps: transaction,
})
```
