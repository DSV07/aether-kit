export function nowISO() {
    return new Date().toISOString();
}
export function nowLocalISO(offsetHours = -3) {
    const now = new Date();
    const offsetMs = offsetHours * 60 * 60 * 1000;
    const local = new Date(now.getTime() + offsetMs);
    const sign = offsetHours >= 0 ? '+' : '-';
    const absHours = Math.abs(offsetHours).toString().padStart(2, '0');
    const year = local.getUTCFullYear();
    const month = (local.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = local.getUTCDate().toString().padStart(2, '0');
    const hours = local.getUTCHours().toString().padStart(2, '0');
    const minutes = local.getUTCMinutes().toString().padStart(2, '0');
    const seconds = local.getUTCSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${absHours}:00`;
}
export function isValidISO(dateStr) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
}
//# sourceMappingURL=dates.js.map