/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

/**
 * Validates a URL, optionally checking if it contains a specific domain
 */
export function validateUrl(url: string, domain?: string): boolean {
  try {
    const urlObj = new URL(url)
    if (domain) {
      return urlObj.hostname.includes(domain)
    }
    return true
  } catch (e) {
    return false
  }
}

