/**
 * Standard http success json response.
 */
export const success = (data: object, message: string, code: number) => ({
    code,
    data,
    message,
    success: true
})

/**
 * Standard http error json response.
 */
export const failed = (error: object, message: string, code: number) => ({
    code,
    error,
    message,
    success: false
})
