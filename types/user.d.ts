export interface UserIdentity {
  id: string
  user_id: string
  identity_data?: {
    [key: string]: any
  }
  provider: string
  created_at?: string
  last_sign_in_at?: string
  updated_at?: string
}
export interface Factor {
  id: string
  friendly_name?: string
  factor_type: 'totp' | string
  status: 'verified' | 'unverified'

  created_at: string
  updated_at: string
}

export interface UserAppMetadata {
  provider?: string
  [key: string]: any
}

export interface UserMetadata {
  [key: string]: any
}
export interface User {
  id: string
  app_metadata: UserAppMetadata
  user_metadata: UserMetadata
  aud: string
  confirmation_sent_at?: string
  recovery_sent_at?: string
  email_change_sent_at?: string
  new_email?: string
  new_phone?: string
  invited_at?: string
  action_link?: string
  email?: string
  phone?: string
  created_at: string
  confirmed_at?: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  last_sign_in_at?: string
  role?: string
  updated_at?: string
  identities?: UserIdentity[]
  factors?: Factor[]
}