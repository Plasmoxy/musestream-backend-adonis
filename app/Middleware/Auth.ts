import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

// Note: auth is custom made

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = '/login'

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    /**
     * Hold reference to the guard last attempted within the for loop. We pass
     * the reference of the guard to the "AuthenticationException", so that
     * it can decide the correct response behavior based upon the guard
     * driver
     */
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        /**
         * Instruct auth to use the given guard as the default guard for
         * the rest of the request, since the user authenticated
         * succeeded here
         */
        auth.defaultGuard = guard
        return true
      }
    }

    /**
     * Unable to authenticate using any guard
     */
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo,
    )
  }

  /**
   * Handle request
   */
  public async handle (
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    allowedUserTypes?: string[] // NOTE: SPECIFY ROLES TO RESTRICT ROUTE TO SPECIFIC USER ROLES !
  ) {
    /**
     * Uses the user defined guards or the default guard mentioned in
     * the config file
     */
    const customGuards = []
    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards)
    
    // custom logic - we check user role if role
    // else: otherwise allow all types
    if (allowedUserTypes?.length) {
      const user = auth.user!
      
      // if user not in specified types
      if (!(user && user.type in allowedUserTypes)) {
        throw new AuthenticationException(
          'Unauthorized access for user type, allowed types: ' + allowedUserTypes.join(','),
          'E_UNAUTHORIZED_ACCESS_TYPE',
          'api',
          this.redirectTo,
        )
      }
    }
    
    // continue with request
    await next()
  }
}
