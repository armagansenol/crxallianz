import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PhoneNumberUtil } from "google-libphonenumber"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUtmParameter = (param: string) => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) || ""
  }
  return ""
}

const phoneUtil = PhoneNumberUtil.getInstance()

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    console.log("error", error)
    return false
  }
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
