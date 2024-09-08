export const saveCartToLocalStorage = (cartState: any) => {
    try {
      const serializedCart = JSON.stringify(cartState);
      localStorage.setItem('cart', serializedCart);
    } catch (e) {
      console.warn('Could not save cart state to localStorage', e);
    }
  };
  
  export const loadCartFromLocalStorage = () => {
    try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
        return undefined; // No cart in localStorage
      }
      return JSON.parse(serializedCart);
    } catch (e) {
      console.warn('Could not load cart state from localStorage', e);
      return undefined;
    }
  };
  
  // src/utils/localStorage.ts
export const saveLoginToLocalStorage = (loginState: any) => {
    try {
      const serializedLogin = JSON.stringify(loginState);
      localStorage.setItem('login', serializedLogin);
    } catch (e) {
      console.warn('Could not save login state to localStorage', e);
    }
  };
  
  export const loadLoginFromLocalStorage = () => {
    try {
      const serializedLogin = localStorage.getItem('login');
      if (serializedLogin === null) {
        return undefined; // No login data in localStorage
      }
      return JSON.parse(serializedLogin);
    } catch (e) {
      console.warn('Could not load login state from localStorage', e);
      return undefined;
    }
  };
  
  export const clearLoginFromLocalStorage = () => {
    try {
      localStorage.removeItem('login');
    } catch (e) {
      console.warn('Could not clear login state from localStorage', e);
    }
  };
  