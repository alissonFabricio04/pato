/* eslint-disable @typescript-eslint/no-unused-vars */

import UnitOfWork from '../../../application/repository/UnitOfWork'
import { ConnectionDatabaseType } from '../../database/Connection'

export default class UnitOfWorkDatabase extends UnitOfWork {
  constructor(readonly databaseConnection: ConnectionDatabaseType) {
    super()
  }

  async commit(): Promise<void> {
    // Promise.all(this.operations)
    await this.databaseConnection.$transaction(async (_) => {
      for (let i = 0; i < this.operations.length; i++) {
        await this.operations[i]
      }
    })
  }
}
