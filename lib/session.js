// ../lib/session.js

export async function checkSession(request) {
    try {
        const authorizationHeader = request.headers.get('Authorization');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return false;
        }

        const token = authorizationHeader.split(' ')[1];

        // Example: Perform actual verification logic (e.g., verify JWT, check session in a database)
        // Replace this with your actual implementation
        const isValidSession = await verifySession(token);

        return isValidSession;
    } catch (error) {
        console.error("Error during session verification:", error);
        throw error; // Rethrow the error to propagate it up the call stack
    }
}

// Example function for verifying the session (replace with your actual implementation)
async function verifySession(token) {
    try {
        // Implement your session verification logic here
        // If verification is successful, return true; otherwise, return false

        // For simplicity, let's assume the token is valid if it exists
        return !!token;
    } catch (error) {
        console.error("Error during session verification:", error);
        throw error; // Rethrow the error to propagate it up the call stack
    }
}
