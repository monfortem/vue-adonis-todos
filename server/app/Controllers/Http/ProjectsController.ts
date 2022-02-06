import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Project from 'App/Models/Project'
import AuthorizationService from 'App/Services/AuthorizationService'

export default class ProjectsController {
    public async index(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const projects = await Project.query().where('userId', user.id)
        return projects
    }

    public async create(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { title } = ctx.request.all()
        const project = new Project()
        
        project.fill({
            title
        })
        
        await project.related('user').associate(user)

        return project
    }

    public async destroy(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { id } = ctx.params
        const project = await Project.findOrFail(id)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })

        await project.delete()
        return project
    }

    public async update(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { id } = ctx.params
        const project = await Project.findOrFail(id)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })

        project.merge(ctx.request.only(['title']))
        await project.save()

        return project

    }
}
