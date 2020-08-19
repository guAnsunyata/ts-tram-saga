export type Transaction = {
  steps: Step[]
}

export interface Step {
  process: Process
  reply?: Reply[]
  compensation?: Function
}

export interface Reply {
  predicate: Object
  process: ReplyProcess
}

export type Process = (() => Promise<any>) | Function
export type ReplyProcess = ((payload?: any) => Promise<any>) | Function
