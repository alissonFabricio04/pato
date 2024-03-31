import UnitOfWork from '../../../application/repository/UnitOfWork'

export class UnitOfWorkInMemory extends UnitOfWork {
  constructor() {
    super()
  }

  async commit(): Promise<void> {
    Promise.all(this.operations)
  }
}