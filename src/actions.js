export const SELECT = 'SELECT';

export function select(idx, value) {
  return {
    type: SELECT,
    idx,
    value,
  }
}
