const getRole = (token: string): string => {
    debugger;
    const base64Url = token.split('.')[1]; // Extract the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
    const decodedToken = decodeURIComponent(escape(window.atob(base64))); // Decode the Base64 string

    try {
        return JSON.parse(decodedToken)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (error) {
        console.log('Error decoding JWT:', error);
        return '';
    }
};

export default getRole;