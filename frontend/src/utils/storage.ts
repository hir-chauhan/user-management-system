export const buildQueryString = (params: Record<string, unknown> = {}): string => {

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const getStoredItem = <T>(key: string, defaultValue: T): T => {

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStoredItem = <T>(key: string, value: T): void => {

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to set localStorage item', e);
  }
};

export const removeStoredItem = (key: string): void => {

  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove localStorage item', e);
  }
};
