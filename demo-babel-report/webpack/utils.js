export function getFileExt(filename = '') {
  const dotIndex = filename.lastIndexOf('.');

  if (dotIndex > 0 && dotIndex < filename.length - 1) {
    return filename.substring(dotIndex);
  }

  return '';
}
