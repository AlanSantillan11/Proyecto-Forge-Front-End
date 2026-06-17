export function tiempoPublicacion(fecha) {
  if (!fecha) return ""; 

  const date = new Date(fecha);
  if (isNaN(date)) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  if (diffHours < 24) {
    return rtf.format(-diffHours, "hour");
  }

  return rtf.format(-diffDays, "day");
}
