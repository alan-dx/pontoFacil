import { UserStatus } from './UserStatus';

export type User = {
  id: string
  email: string
  isCompany: boolean
  fullName: string
  companyId?: string
  status?: UserStatus
}
