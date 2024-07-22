export interface Iuser {
    first_name: string, 
    last_name: string, 
    age: number, 
    gender: string, 
    strikes: number, 
    user_id: string
  }

  export interface ICreateUser {
    first_name: string, 
    last_name: string, 
    age: number, 
    gender: string, 
    strikes: number, 
    user_id: string,
    username: string,
    password: string
  }

  export interface ILogin {
    username: string,
    password: string
  }