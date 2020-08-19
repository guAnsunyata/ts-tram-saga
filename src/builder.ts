import { Step, Process } from './transaction'

const emptyStep = () => ({
  process: () => Promise.resolve(),
  reply: [],
})

export class Builder {
  private steps: Step[] = []

  step() {
    this.steps.push(emptyStep())
    return this
  }

  invoke(process: Process) {
    this.currentStep.process = process
    return this
  }

  withCompensation(compensation: Process) {
    this.currentStep.compensation = compensation
    return this
  }

  onReply(predicate: Object, process: Process) {
    this.currentStep.reply?.push({
      predicate,
      process,
    })
    return this
  }

  get() {
    return this.steps
  }

  get currentStep() {
    return this.steps[this.steps.length - 1]
  }
}
