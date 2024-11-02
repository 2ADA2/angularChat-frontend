export interface AuthInterface {
  username:string
  messages:MessageInterface[]
}

export interface MessageInterface {
  author:string,
  message:string,
  id:number
}
