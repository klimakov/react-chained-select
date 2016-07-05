export const SELECT = 'SELECT';

export function toSelect(idx, value) {
  return {
    type: SELECT,
    idx,
    value,
  };
}
