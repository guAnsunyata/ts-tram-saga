import { Order } from '../create-order/entity/Order'
import { EventBus } from '../event-bus'
import { Builder } from '../../src/builder'
import { exec } from '../../src/runner'
import { CustomerNotFound } from '../reserve-credit/exception/CustomerNotFound'
import { CustomerCreditLimitExceeded } from '../reserve-credit/exception/CustomerCreditLimitExceeded'

export class CreateOrder {
  private order: Order | null = null
  constructor(
    private $event: EventBus,
    private orderRepo: OrderRepoInterface
  ) {}

  async execute() {
    const builder = new Builder()

    /* eslint-disable */
		const transaction = builder
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
    /* eslint-enable */

    await exec({
      steps: transaction,
    })
  }

  createOrder() {
    this.order = new Order('1', '1')
    this.orderRepo.save(this.order)
  }

  private createOrderCompensation() {
    this.order!.reject()
    this.orderRepo.save(this.order!)
  }

  private reserveCredit() {
    return this.$event.send('reserveCredit', {})
  }

  private approveOrder() {
    this.order!.approve()
    this.orderRepo.save(this.order!)
  }

  private handleCustomerNotFound() {
    console.log('handleCustomerNotFound')
  }

  private handleCustomerCreditLimitExceeded() {
    console.log('handleCustomerCreditLimitExceeded')
  }
}

export interface OrderRepoInterface {
  save: (order: Order) => void
}
