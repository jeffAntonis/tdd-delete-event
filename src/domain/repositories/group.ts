import { Group } from '@/domain/models'

export interface LoadGroupRepository {
  load: (input: { eventId: string }) => Promise<Group | undefined>
}
