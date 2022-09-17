import type { Status } from './enum'

export interface LoginStatus {
  status: Status,
  message?: string
}