class CookieService {
    static set(name: string, value: string, days: number = 7): void {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
    }
  
    static get(name: string): string | null {
      const nameEQ = encodeURIComponent(name) + "=";
      const cookies = document.cookie.split(";");
  
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(nameEQ)) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
      return null;
    }
  
    static delete(name: string): void {
      document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}
  
export default CookieService;
  