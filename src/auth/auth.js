// auth.js
export const setUserData = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
};

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const clearUserData = () => {
    localStorage.removeItem('user');
};

export const isAuthenticated = () => {
    const user = getUserData();
    if(user)
        return user !== null;
    else
        return null;
};

export const getUserRole = () => {
    const user = getUserData();
    return user ? user.role : null;
};

export const redirectToDashboard = () => {
    const role = getUserRole();
    if (!role) return '/login';

    switch (role) {
        case 'ADMIN':
            return '/admin-dashboard/analytics';
        case 'OFFADMIN':
            return '/office-admin';
        case 'NURSE':
            return '/nurse-dashboard';
        case 'USER':
            return '/user-dashboard';
        default:
            return '/login';
    }
};



export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    // Retrieve user role before removing the user data
    const userRole = getUserRole();
  
    // Remove user-specific data from local storage
    localStorage.removeItem('user');
    
    if (userRole) {
      localStorage.removeItem('userData'); // Clear cached data based on the role
    }
    
    // Redirect to home
    window.location.href = '/';
  };
