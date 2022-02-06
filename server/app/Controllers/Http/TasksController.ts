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
        
        const tasks = await Task.query().where('projectId', project.id).orderBy('id', 'desc')
        
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

    async destroy(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { id } = ctx.params
        const task = await Task.findOrFail(id)
        const project = await Project.findOrFail(task.projectId)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })

        await task.delete()
        return task
    }

    async update(ctx: HttpContextContract) {
        const user = await User.findOrFail(ctx.auth.user?.id)
        const { id } = ctx.params
        const task = await Task.findOrFail(id)
        const project = await Project.findOrFail(task.projectId)

        AuthorizationService.verifyPermission({ resourceId: project.userId, userId: user.id })

        task.merge(ctx.request.only(['description']))
        await task.save()

        return task
    }
}
