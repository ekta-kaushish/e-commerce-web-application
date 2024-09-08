export const loginApi = (email: string, password: string): Promise<{ email: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'ekta@gmail.com' && password === 'ekta') {
          resolve({ email });
        } else {
          reject('Invalid credentials');
        }
      }, 1000);
    });
  };
  