export default abstract class UnitOfWork {
  protected operations: any[]

  protected constructor() {
    this.operations = []
  }

  async createTransaction(operations: any[]): Promise<void> {
    this.operations.push(operations)
  }

  async commit(): Promise<void> { }
}