export enum OrderState {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export class Order {
  private _state: OrderState = OrderState.IDLE

  constructor(private _id: string, private _userId: string) {}

  get id() {
    return this._id
  }

  get userId() {
    return this._userId
  }

  get state() {
    return this._state
  }

  approve() {
    this._state = OrderState.APPROVED
  }

  reject() {
    this._state = OrderState.APPROVED
  }
}
