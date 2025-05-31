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

export const convertImageToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    cache: "no-store",
  });

  const contentType = response.headers.get("Content-Type");

  if (!response.ok || !contentType?.startsWith("image")) {
    throw new Error(`Error loading image ${url}`);
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
