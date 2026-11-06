
export const parseBanglaNumber = (value) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  const normalized = String(value ?? "").replace(/[০-৯]/g, (digit) =>
    String(banglaDigits.indexOf(digit))
  );

  return Number(normalized.replace(/[^0-9.-]/g, "")) || 0;
};
