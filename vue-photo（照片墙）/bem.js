export function createBem(nameSpace) {
  return (name) => {
    return `${nameSpace}-${name}`;
  };
}
