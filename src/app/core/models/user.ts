export interface User {
  uid?: string //id do usuário. Quando cadastro no firebase ele gera um desse
  email: string
  username: string
  birthdate: Date
  profile?: string
}
