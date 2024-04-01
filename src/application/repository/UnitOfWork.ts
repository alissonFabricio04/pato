export default abstract class UnitOfWork {
  protected operations: unknown[]

  protected constructor() {
    this.operations = []
  }

  async createTransaction(operations: unknown[]): Promise<void> {
    this.operations.push(operations)
  }

  async commit(): Promise<void> {}
}
