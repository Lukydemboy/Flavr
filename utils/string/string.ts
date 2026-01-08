export namespace StringUtils {
  export function getHostnameFromUrl(str: string): string {
    const url = new URL(str);
    const host = url.hostname.split(".");
    return StringUtils.capitalizeFirstLetter(host[host.length - 2]).replace(
      "-",
      " ",
    );
  }

  export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
