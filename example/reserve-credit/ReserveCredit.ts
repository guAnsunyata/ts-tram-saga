import { CustomerNotFound } from './exception/CustomerNotFound'
import { CustomerCreditLimitExceeded } from './exception/CustomerCreditLimitExceeded'

export class ReserveCredit {
  reserve(userId: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(true) // Condition 1.
        reject(CustomerNotFound) // Condition 2.
        // reject(CustomerCreditLimitExceeded) // Condition 3.
      }, 200)
    })
  }
}
