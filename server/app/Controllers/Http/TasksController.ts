import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import AuthorizationService from 'App/Services/AuthorizationService'

export default class TasksController {
    async index(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { id } = ctx.params
        const project = await Project.findOrFail(id)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })
        
        const tasks = await Task.query().where('projectId', project.id)
        
        return tasks
    }

    async create(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { description } = ctx.request.all()
        const { id } = ctx.params
        const project = await Project.findOrFail(id)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })
        
        const task = new Task()
        
        task.fill({
            description
        })
        
        await task.related('project').associate(project)

        return task
    }
}
