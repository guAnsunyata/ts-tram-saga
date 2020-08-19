import { Application } from '@/../example/Application'
import { Order } from '@/../example/create-order/entity/Order'
import { ReserveCredit } from '@/../example/reserve-credit/ReserveCredit'
import { CustomerNotFound } from '@/../example/reserve-credit/exception/CustomerNotFound'

let result: any = null

// Order
const approve = jest.fn()
const reject = jest.fn()
jest.mock('@/../example/create-order/entity/Order')
;(Order as jest.Mock).mockImplementation(() => {
  return {
    approve,
    reject,
  }
})

// ReserveCredit
jest.mock('@/../example/reserve-credit/ReserveCredit')
;(ReserveCredit as jest.Mock).mockImplementation(() => {
  return {
    reserve: () => {
      return result
    },
  }
})
test('Approve order', async () => {
  result = Promise.resolve(true)
  const app = new Application()
  await app.createOrder()
  expect(approve).toBeCalled()
  expect(reject).not.toBeCalled()
  approve.mockClear()
  reject.mockClear()
})

test('Reject order with customer not found', async () => {
  result = Promise.reject(new CustomerNotFound())
  const app = new Application()
  await app.createOrder()
  expect(approve).not.toBeCalled()
  expect(reject).toBeCalled()
})
