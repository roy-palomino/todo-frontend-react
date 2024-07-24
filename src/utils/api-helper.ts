type DataObject = { [key: string]: any };

export function purgeData<T extends DataObject>(data: T): Partial<T> {
  const result = { ...data };
  for (const key in result) {
    if (typeof result[key] === "boolean") continue;
    if (
      !result[key] ||
      (Array.isArray(result[key]) && result[key].length === 0)
    ) {
      delete result[key];
    }
  }
  return result;
}
