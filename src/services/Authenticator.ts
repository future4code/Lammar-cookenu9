import * as jwt from 'jsonwebtoken'
import { Unauthorized } from '../error/CustomError'
import { AuthenticationData } from '../model/user'

export class Authenticator {

    public generateToken = ( id : AuthenticationData) : string => {
        const token =  jwt.sign(
            id,
            process.env.JWT_KEY as string,
            {expiresIn:"240h"}
        )
        return token
    }

    public verifyToken = ( token : string) : AuthenticationData => {
        try {
            const payload = jwt.verify(
                token, 
                process.env.JWT_KEY as string) as AuthenticationData
            return payload
        } catch (error:any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    }

}