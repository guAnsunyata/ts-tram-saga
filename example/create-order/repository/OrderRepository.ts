import { Order } from '../entity/Order'
import { OrderRepoInterface } from '../CreateOrder'

export class OrderRepo implements OrderRepoInterface {
  private store: Record<string, Order> = {}

  save(order: Order) {
    this.store[order.id] = order
  }
}
