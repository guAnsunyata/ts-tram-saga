import { Application } from '@/../example/Application'
import { Order } from '@/../example/create-order/entity/Order'
import { ReserveCredit } from '@/../example/reserve-credit/ReserveCredit'
import { CustomerNotFound } from '@/../example/reserve-credit/exception/CustomerNotFound'

// Order
const orderApprove = jest.fn()
const orderReject = jest.fn()
jest.mock('@/../example/create-order/entity/Order')
;(Order as jest.Mock).mockImplementation(() => {
  return {
    approve: orderApprove,
    reject: orderReject,
  }
})

// ReserveCredit
const reserveResult = jest.fn()
jest.mock('@/../example/reserve-credit/ReserveCredit')
;(ReserveCredit as jest.Mock).mockImplementation(() => {
  return {
    reserve: reserveResult,
  }
})

afterEach(() => {
  orderApprove.mockClear()
  orderReject.mockClear()
})

test('Approve order when credit reserved', async () => {
  reserveResult.mockResolvedValue(true)
  const app = new Application()
  await app.createOrder()

  expect(orderApprove).toBeCalled()
  expect(orderReject).not.toBeCalled()
})

test('Reject order when giving customer not found rejection', async () => {
  reserveResult.mockRejectedValue(new CustomerNotFound())
  const app = new Application()
  await app.createOrder()

  expect(orderApprove).not.toBeCalled()
  expect(orderReject).toBeCalled()
})
