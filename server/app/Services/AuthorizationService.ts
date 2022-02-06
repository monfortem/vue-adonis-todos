import ResourceNotFoundException from "App/Exceptions/ResourceNotFoundException"
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException"

export default class AuthorizationService {
    public static verifyPermission({ resourceId, userId }: { resourceId: number | undefined; userId: number; }): void {
        if (!resourceId) {
            const message = 'Unable to find resource'
            const status = 404
            const errorCode = 'E_RESOURCE_NOT_FOUND'

            throw new ResourceNotFoundException(message, status, errorCode)
        }

        if (resourceId !== userId) {
            const message = 'You are not authorized'
            const status = 403
            const errorCode = 'E_UNAUTHORIZED'

            throw new UnAuthorizedException(message, status, errorCode)
        }
    }
}