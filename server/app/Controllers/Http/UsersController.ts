import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DuplicateEntryException from 'App/Exceptions/DuplicateEntryException'
import User from 'App/Models/User'

export default class UsersController {
    async login(ctx: HttpContextContract) {
        const { email, password } = ctx.request.all()
        try {
            const token = await ctx.auth.use('api').attempt(email, password)
            return token
        } catch (error) {
            return ctx.response.notAcceptable(
                {
                    "message": 'Invalid credentials'
                }
            )
        }

    }

    async register(ctx: HttpContextContract) {
        const { email, password } = ctx.request.all()
        try {
            await User.create({
                email,
                password,
                username: email
            })   
        } catch (error) {
            if (error.constraint == 'users_email_unique') {
                const message = 'Email account already exists'
                const status = 409
                const errorCode = 'E_DUPLICATE_ENTRY'

                throw new DuplicateEntryException(message, status, errorCode)
            }
        }
        return this.login(ctx)
    }
}
