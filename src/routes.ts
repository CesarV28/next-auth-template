
/**
 * Array of routes that are accessible to the public
 * These routes will redirect logged in users to /settings
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
]

/**
 * Array of routes that are for authentication
 * These routes will redirect logged users to /settings
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
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect paht after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * The default redirect paht after logging out
 */
export const DEFAULT_LOGOUT_REDIRECT = "/";

/**
 * The default redirect paht after registering
 */
export const DEFAULT_REGISTER_REDIRECT = "/";

/**
 * The default login URL
 */
export const DEFAULT_LOGIN_URL = "/auth/login";