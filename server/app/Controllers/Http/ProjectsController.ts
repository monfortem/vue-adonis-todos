import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Project from 'App/Models/Project'
import AuthorizationService from 'App/Services/AuthorizationService'

export default class ProjectsController {
    public async index(ctx: HttpContextContract) {
        const projects = await Project
            .query()
            .has('user','=',ctx.auth.user?.id)
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
        const project = await Project.find(id)

        AuthorizationService.verifyPermission({ resourceId: project?.userId, userId: user.id })

        await project?.delete()
        return project
    }
}
