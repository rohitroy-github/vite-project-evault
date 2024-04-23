import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function shortenWalletAddress(walletAddress) {
  if (!walletAddress || typeof walletAddress !== "string") {
    return "Invalid wallet address";
  }

  const prefix = walletAddress.slice(0, 10);

  const suffix = walletAddress.slice(-10);

  return `${prefix}...${suffix}`;
}

export function superShortenWalletAddress(walletAddress) {
  if (!walletAddress || typeof walletAddress !== "string") {
    return "Invalid wallet address";
  }

  const prefix = walletAddress.slice(0, 3);

  const suffix = walletAddress.slice(-3);

  return `${prefix}...${suffix}`;
}
