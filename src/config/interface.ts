import type { Status } from './enum'

export interface LoginStatus {
  status: Status,
  message?: string
}

export interface LoginForm {
  username: string,
  password: string,
  buttonStatus: Status
}