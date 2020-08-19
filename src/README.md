
The sample of builder result:

```ts
const transaction = {
  steps: [
    {
      // local
      process: createOrder, // invoke
      compensation: createOrderCompensation,
    },
    {
      // promise
      process: reserveCredit, // invokePromise
      reply: [
        {
          // predicateFn: (data: boolean) => data === true,
          predicate: CustomerNotFound,
          process: handleCustomerNotFound,
        },
        {
          // predicate: (data: boolean) => data === false,
          predicate: CustomerCreditLimitExceeded,
          process: handleCustomerCreditLimitExceeded,
        },
      ],
    },
    {
      // local
      process: approveOrder,
    },
  ],
}
```