export const formatPhoneNumber = (value: string) => {
  if (!value) return;
  let phoneNumber = value.replace(/\D/g, "");
  if (phoneNumber.length >= 4 && phoneNumber.length < 7) {
    phoneNumber = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3)}`;
  } else if (phoneNumber.length >= 7) {
    phoneNumber = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(2, 5)}-${phoneNumber.substring(5)}`;
  } else {
    phoneNumber = phoneNumber;
  }

  return phoneNumber;
};

export function formatPhoneNumberKorean(input: string): string {
  // Remove any non-digit characters
  const digits = input.replace(/\D/g, "");
  // Check the length of the digits

  if (digits.length <= 10) {
    // Cell phone number format

    return [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6)]
      .filter((group) => group)
      .join("-"); //Home phone number : 00-0000-0000 (2-4-4) = 10
  }

  return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 11)]
    .filter((group) => group)
    .join("-"); //Mobile phone number : 000-0000-0000 (3-4-4) = 11
}
