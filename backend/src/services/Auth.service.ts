import { UserRepository } from "../repositories/User.repository";
import { comparePassword } from "../utils/bcrypt/bcrypt.config";
import { generateJWT } from "../utils/jwt/jwt.config";
import { LoginType } from "../utils/schema/auth.schema";

export class AuthService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async login (data:LoginType) {
        try {
            const user = await this.userRepository.findByEmail(data.email);
            if(!user) {
                return {
                    status:"error",
                    payload:"User not found"
                }
            }
            const isValid = await comparePassword(data.password,user.password)
            if(!isValid) {
                return {
                    status:"error",
                    payload:"Incorrect password"
                }
            }

            const token = generateJWT({id:user.id})

            return {
                status:"success",
                payload:token
            }
            
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }
}