export function parseId(id: string) {
  const createdAt = id.slice(8);

  switch (true) {
    case id.startsWith("001"):
      // v1 Id.
      return { createdAt };
  }
}
