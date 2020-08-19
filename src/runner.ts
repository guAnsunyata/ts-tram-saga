import { Transaction, Step, Reply } from './transaction'

const advance = async (step: Step) => {
  try {
    await step.process()
  } catch (error) {
    if (step.reply) {
      const matchedReply = step.reply.find(
        (_reply: any) => error instanceof _reply.predicate
      )

      if (matchedReply) {
        matchedReply.process()
      }
    }

    throw error
  }
}

const rollback = (steps: Step[]) => {
  const compensations = steps.reduce((acc, step) => {
    if (step.compensation) {
      acc.push(step.compensation())
    }
    return acc
  }, [] as Function[])

  return Promise.all(compensations)
}

export async function exec(transaction: Transaction) {
  const stack = transaction.steps.slice()
  const completedStack: Step[] = []
  try {
    while (stack.length >= 1) {
      const step = stack.shift()
      if (!step) return
      completedStack.push(step)
      await advance(step)
    }
  } catch (error) {
    try {
      await rollback(completedStack)
    } catch (error) {
      throw error
    }
  }
}
