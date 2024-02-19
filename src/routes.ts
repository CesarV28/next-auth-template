
/**
 * Array of routes that are accessible to the public
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
]

/**
 * Array of routes that are for authentication
 * These routes will redirect logged users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * The prefix for API authenticated routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect paht after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";