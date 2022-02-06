import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async login(ctx: HttpContextContract) {
        const { email, password } = ctx.request.all()
        try {
            const token = await ctx.auth.use('api').attempt(email, password)
            return token
        } catch (error) {
            return ctx.response.badRequest(
                {
                    "message": 'Invalid credentials'
                }
            )
        }

    }

    public async register(ctx: HttpContextContract) {
        const { email, password } = ctx.request.all()
        await User.create({
            email,
            password,
            username: email
        })
        return this.login(ctx)
    }
}
