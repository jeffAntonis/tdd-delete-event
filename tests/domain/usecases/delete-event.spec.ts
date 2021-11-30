class DeleteEvent {
  constructor (
    private readonly loadGroupRepository: LoadGroupRepository
  ) {}

  async perform ({ id }: { id: string, userId: string }): Promise<void> {
    const group = await this.loadGroupRepository.load({ eventId: id })

    if (group === undefined) throw new Error()
  }
}

interface LoadGroupRepository {
  load: (input: { eventId: string }) => Promise<undefined>
}

class LoadGroupRepositoryMock implements LoadGroupRepository {
  eventId?: string | undefined
  callsCount = 0
  output: any = 'any_value'

  async load ({ eventId }: { eventId: string }): Promise<undefined> {
    this.eventId = eventId
    this.callsCount++
    return this.output
  }
}

type SutTypes = {
  sut: DeleteEvent
  loadGroupRepository: LoadGroupRepositoryMock
}

const makeSut = (): SutTypes => {
  const loadGroupRepository = new LoadGroupRepositoryMock()
  const sut = new DeleteEvent(loadGroupRepository)
  return {
    sut,
    loadGroupRepository
  }
}

describe('Delete Event', () => {
  const id = 'any_event_id'
  const userId = 'any_user_id'

  it('should get group data', async () => {
    const { sut, loadGroupRepository } = makeSut()

    await sut.perform({ id, userId })

    expect(loadGroupRepository.eventId).toBe(id)
    expect(loadGroupRepository.callsCount).toBe(1)
  })

  it('should throw if eventId is invalid', async () => {
    const { sut, loadGroupRepository } = makeSut()
    loadGroupRepository.output = undefined

    const promise = sut.perform({ id, userId })

    await expect(promise).rejects.toThrowError()
  })
})
