import { Group } from '@/domain/models'
import { LoadGroupRepository } from '@/domain/repositories'

export class LoadGroupRepositorySpy implements LoadGroupRepository {
  eventId?: string | undefined
  callsCount = 0
  output?: Group = {
    users: [{ id: 'any_user_id', permission: 'admin' }]
  }

  async load ({ eventId }: { eventId: string }): Promise<Group | undefined> {
    this.eventId = eventId
    this.callsCount++
    return this.output
  }
}
