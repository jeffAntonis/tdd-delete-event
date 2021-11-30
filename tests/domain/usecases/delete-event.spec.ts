class DeleteEvent {
  constructor (
    private readonly loadGroupRepository: LoadGroupRepository
  ) {}

  async perform ({ id }: { id: string, userId: string }): Promise<void> {
    await this.loadGroupRepository.load({ eventId: id })
  }
}

interface LoadGroupRepository {
  load: (input: { eventId: string }) => Promise<void>
}

class LoadGroupRepositoryMock implements LoadGroupRepository {
  eventId?: string | undefined

  async load ({ eventId }: { eventId: string }): Promise<void> {
    this.eventId = eventId
  }
}

describe('Delete Event', () => {
  it('should get group data', async () => {
    const id = 'any_event_id'
    const userId = 'any_user_id'
    const loadGroupRepository = new LoadGroupRepositoryMock()
    const sut = new DeleteEvent(loadGroupRepository)

    await sut.perform({ id, userId })

    expect(loadGroupRepository.eventId).toBe(id)
  })
})