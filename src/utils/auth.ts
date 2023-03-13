import { b64UriEncode } from "@wxhccc/es-util"

export const encrptedPassword = (password: string) => b64UriEncode(password)