export default abstract class UnitOfWork {
  protected operations: Promise<void>[]

  protected constructor() {
    this.operations = []
  }

  async createTransaction(operations: Promise<void>[]): Promise<void> {
    this.operations = operations
  }

  async commit(): Promise<void> {}
}
