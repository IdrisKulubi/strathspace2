/**
 * Email validation utilities for StrathSpace authentication
 * Updated to allow all email domains for broader accessibility
 */

/**
 * Validates if an email address has a valid format
 * @param email - The email address to validate
 * @returns true if the email has a valid format
 */
export function validateEmailFormat(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Normalize email to lowercase and trim whitespace
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if email has valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalizedEmail);
}

/**
 * Extracts the domain from an email address
 * @param email - The email address
 * @returns the domain part of the email or null if invalid
 */
export function extractEmailDomain(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const emailParts = normalizedEmail.split('@');
  
  if (emailParts.length !== 2) {
    return null;
  }

  return emailParts[1];
}

/**
 * Custom error class for email validation failures
 */
export class EmailValidationError extends Error {
  public readonly email: string;
  public readonly domain: string | null;
  public readonly timestamp: Date;

  constructor(email: string, reason: string = 'Invalid email format') {
    const domain = extractEmailDomain(email);
    const message = `Authentication failed: ${reason} for email ${email}`;
    
    super(message);
    this.name = 'EmailValidationError';
    this.email = email;
    this.domain = domain;
    this.timestamp = new Date();
  }

  /**
   * Returns a user-friendly error message
   */
  getUserMessage(): string {
    return 'Please provide a valid email address to access StrathSpace.';
  }

  /**
   * Returns detailed error information for logging
   */
  getLogDetails() {
    return {
      error: 'INVALID_EMAIL_FORMAT',
      email: this.email,
      domain: this.domain,
      timestamp: this.timestamp.toISOString(),
      message: this.message,
    };
  }
}

/**
 * Logs successful authentication events
 * @param email - The authenticated email address
 * @param userId - The user ID
 * @param request - The request object for additional context
 */
export function logSuccessfulAuth(email: string, userId: string, request: Request): void {
  const logData = {
    event: 'AUTHENTICATION_SUCCESS',
    email,
    userId,
    domain: extractEmailDomain(email),
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString(),
  };

  console.log('Successful authentication:', logData);
}

/**
 * Logs authentication errors for monitoring
 * @param error - The error that occurred
 * @param email - The email address (if available)
 * @param request - The request object for additional context
 */
export function logAuthError(error: Error, email: string | undefined, request: Request): void {
  const logData = {
    event: 'AUTHENTICATION_ERROR',
    error: error.message,
    email: email || 'unknown',
    domain: email ? extractEmailDomain(email) : null,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString(),
    stack: error.stack,
  };

  console.error('Authentication error:', logData);
}

/**
 * Validates and normalizes email for authentication
 * @param email - The email to validate and normalize
 * @returns normalized email if valid, throws EmailValidationError if invalid
 */
export function validateAndNormalizeEmail(email: string): string {
  if (!validateEmailFormat(email)) {
    throw new EmailValidationError(email, 'Invalid email format');
  }

  return email.toLowerCase().trim();
}

/**
 * Checks if an email domain is from a common provider
 * @param email - The email address to check
 * @returns true if from a common provider (gmail, yahoo, outlook, etc.)
 */
export function isCommonEmailProvider(email: string): boolean {
  const domain = extractEmailDomain(email);
  if (!domain) return false;

  const commonProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'aol.com',
    'live.com',
    'msn.com',
    'yandex.com',
  ];

  return commonProviders.includes(domain);
}

/**
 * Checks if an email domain appears to be from an educational institution
 * @param email - The email address to check
 * @returns true if domain ends with .edu, .ac.*, or other educational patterns
 */
export function isEducationalEmail(email: string): boolean {
  const domain = extractEmailDomain(email);
  if (!domain) return false;

  // Common educational domain patterns
  const eduPatterns = [
    /\.edu$/,           // US educational institutions
    /\.ac\./,           // Academic institutions (international)
    /\.edu\./,          // Educational subdomains
    /university\./,     // University domains
    /college\./,        // College domains
    /school\./,         // School domains
  ];

  return eduPatterns.some(pattern => pattern.test(domain));
}

/**
 * Gets user-friendly information about an email domain
 * @param email - The email address
 * @returns object with domain info
 */
export function getEmailDomainInfo(email: string) {
  const domain = extractEmailDomain(email);
  
  return {
    domain,
    isValid: validateEmailFormat(email),
    isCommonProvider: isCommonEmailProvider(email),
    isEducational: isEducationalEmail(email),
  };
}