export default function useTitleCase() {
    return (str: string): string => {
      return str
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  }
  