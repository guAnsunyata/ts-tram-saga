import { CreateOrder } from './create-order/CreateOrder'
import { ReserveCredit } from '@/../example/reserve-credit/ReserveCredit'
import { OrderRepo } from '@/../example/create-order/repository/OrderRepository'
import { EventBus } from './event-bus'

export class Application {
  private $event: EventBus
  private orderRepo: OrderRepo

  constructor() {
    this.$event = new EventBus()
    this.orderRepo = new OrderRepo()
    this._eventRegister()
  }

  async createOrder() {
    await this.$event.send('createOrder')
  }

  private async _createOrder() {
    const createOrder = new CreateOrder(this.$event, this.orderRepo)
    await createOrder.execute()
  }

  private _eventRegister() {
    this.$event.on('createOrder', this._createOrder.bind(this))
    this.$event.on('reserveCredit', this._reserveCredit.bind(this))
  }

  private _reserveCredit(userId: string) {
    const reserveCredit = new ReserveCredit()
    return reserveCredit.reserve(userId)
  }
}
