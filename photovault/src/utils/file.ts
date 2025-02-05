export function changeFileExtension(
  filename: string,
  extension: string,
): string {
  return filename.split('.').slice(0, -1).join('.') + '.' + extension;
}
