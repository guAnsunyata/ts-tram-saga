export class EventBus {
  private pool: Record<string, Function> = {}

  async send(event: Event, payload?: any) {
    const handler = this.pool[event]
    if (!handler) throw new EventUndefinedError()

    return await handler(payload)
  }

  on(event: Event, handler: (payload?: any) => void) {
    this.pool[event] = handler
  }

  remove(event: Event) {
    delete this.pool[event]
  }
}

export type Event = string
export class EventUndefinedError extends Error {}
