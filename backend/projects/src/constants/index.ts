export const responses = {
    system: {
        401: "Invalid token",
        403: "Not authorized to perform this action",
        409: "Not allowed to perform this action",
        500: "Internal Server Error",
    },
    project: {
        AUTHENTCATION_FAILED: "Could not authenticate",
        NOT_FOUND: "Project not found",
        SUCCESS: "Success"
    },
}