export function formatDate(
  dateInput: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-US"
): string {
  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "";
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(
      date
    );
  } catch (error) {
    return "Invalid date";
  }
}
