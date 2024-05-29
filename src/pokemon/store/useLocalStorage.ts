
const useLocalStorage = (): { storage: any } => {
  const storage = {
    setItem<T>(key: string, value: any): Promise<boolean> {
      return new Promise(resolve => {
        window.localStorage.setItem(key, value);
        resolve(true);
      });
    },
    getItem<T>(key: string): Promise<T | undefined> {
      return new Promise(resolve => {
        const itemStr = window.localStorage.getItem(key);
        if (!itemStr) {
          resolve(undefined);
          return;
        }
        resolve(JSON.parse(itemStr) as any);
      });
    },
    removeItem(key: string): Promise<boolean> {
      return new Promise(resolve => {
        window.localStorage.removeItem(key);
        resolve(true);
      });
    },
    clear() {
      return new Promise(resolve => {
        window.localStorage.clear();
        resolve(true);
      });
    },
  };

  return {
    storage,
  };
};

export default useLocalStorage;
