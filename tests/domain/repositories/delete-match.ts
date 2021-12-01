import { DeleteMatchRepository } from '@/domain/repositories'

export class DeleteMatchRepositoryMock implements DeleteMatchRepository {
  eventId?: string | undefined
  callsCount = 0

  async delete ({ eventId }: { eventId: string }): Promise<void> {
    this.eventId = eventId
    this.callsCount++
  }
}
