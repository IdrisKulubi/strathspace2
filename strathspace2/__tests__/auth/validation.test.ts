import { 
  validateEmailFormat, 
  extractEmailDomain, 
  validateAndNormalizeEmail,
  EmailValidationError,
  isCommonEmailProvider,
  isEducationalEmail,
  getEmailDomainInfo
} from '../../app/lib/auth/validation';

describe('Email Validation (All Domains Allowed)', () => {
  describe('validateEmailFormat', () => {
    it('should accept valid email addresses from any domain', () => {
      const validEmails = [
        'student@strathmore.edu',
        'user@gmail.com',
        'test@yahoo.com',
        'admin@company.co.uk',
        'john.doe@university.ac.ke',
        'test123@example.org',
      ];

      validEmails.forEach(email => {
        expect(validateEmailFormat(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidFormats = [
        'notanemail',
        '@domain.com',
        'user@',
        'user@@domain.com',
        '',
        null as any,
        undefined as any,
        'user@domain',
        'user.domain.com',
      ];

      invalidFormats.forEach(email => {
        expect(validateEmailFormat(email)).toBe(false);
      });
    });

    it('should handle case insensitive emails', () => {
      expect(validateEmailFormat('USER@GMAIL.COM')).toBe(true);
      expect(validateEmailFormat('Test@Example.ORG')).toBe(true);
    });
  });

  describe('extractEmailDomain', () => {
    it('should extract domain from valid emails', () => {
      expect(extractEmailDomain('student@strathmore.edu')).toBe('strathmore.edu');
      expect(extractEmailDomain('USER@GMAIL.COM')).toBe('gmail.com');
      expect(extractEmailDomain('test@company.co.uk')).toBe('company.co.uk');
    });

    it('should return null for invalid emails', () => {
      expect(extractEmailDomain('invalid')).toBe(null);
      expect(extractEmailDomain('')).toBe(null);
      expect(extractEmailDomain(null as any)).toBe(null);
      expect(extractEmailDomain('user@')).toBe(null);
    });
  });

  describe('validateAndNormalizeEmail', () => {
    it('should normalize valid emails from any domain', () => {
      expect(validateAndNormalizeEmail('USER@GMAIL.COM')).toBe('user@gmail.com');
      expect(validateAndNormalizeEmail('  test@strathmore.edu  ')).toBe('test@strathmore.edu');
      expect(validateAndNormalizeEmail('Admin@Company.CO.UK')).toBe('admin@company.co.uk');
    });

    it('should throw EmailValidationError for invalid emails', () => {
      expect(() => validateAndNormalizeEmail('invalid')).toThrow(EmailValidationError);
      expect(() => validateAndNormalizeEmail('user@')).toThrow(EmailValidationError);
      expect(() => validateAndNormalizeEmail('')).toThrow(EmailValidationError);
    });
  });

  describe('isCommonEmailProvider', () => {
    it('should identify common email providers', () => {
      const commonEmails = [
        'user@gmail.com',
        'test@yahoo.com',
        'admin@outlook.com',
        'person@hotmail.com',
        'user@icloud.com',
      ];

      commonEmails.forEach(email => {
        expect(isCommonEmailProvider(email)).toBe(true);
      });
    });

    it('should not identify uncommon providers as common', () => {
      const uncommonEmails = [
        'user@strathmore.edu',
        'admin@company.com',
        'test@university.ac.ke',
        'person@custom-domain.org',
      ];

      uncommonEmails.forEach(email => {
        expect(isCommonEmailProvider(email)).toBe(false);
      });
    });
  });

  describe('isEducationalEmail', () => {
    it('should identify educational email domains', () => {
      const eduEmails = [
        'student@strathmore.edu',
        'prof@university.edu',
        'admin@college.ac.uk',
        'user@school.edu.au',
        'test@university.co.ke',
      ];

      eduEmails.forEach(email => {
        expect(isEducationalEmail(email)).toBe(true);
      });
    });

    it('should not identify non-educational domains', () => {
      const nonEduEmails = [
        'user@gmail.com',
        'admin@company.com',
        'test@business.org',
      ];

      nonEduEmails.forEach(email => {
        expect(isEducationalEmail(email)).toBe(false);
      });
    });
  });

  describe('getEmailDomainInfo', () => {
    it('should provide comprehensive domain information', () => {
      const gmailInfo = getEmailDomainInfo('user@gmail.com');
      expect(gmailInfo.domain).toBe('gmail.com');
      expect(gmailInfo.isValid).toBe(true);
      expect(gmailInfo.isCommonProvider).toBe(true);
      expect(gmailInfo.isEducational).toBe(false);

      const eduInfo = getEmailDomainInfo('student@strathmore.edu');
      expect(eduInfo.domain).toBe('strathmore.edu');
      expect(eduInfo.isValid).toBe(true);
      expect(eduInfo.isCommonProvider).toBe(false);
      expect(eduInfo.isEducational).toBe(true);
    });

    it('should handle invalid emails', () => {
      const invalidInfo = getEmailDomainInfo('invalid');
      expect(invalidInfo.domain).toBe(null);
      expect(invalidInfo.isValid).toBe(false);
      expect(invalidInfo.isCommonProvider).toBe(false);
      expect(invalidInfo.isEducational).toBe(false);
    });
  });

  describe('EmailValidationError', () => {
    it('should create error with correct properties', () => {
      const email = 'invalid-email';
      const error = new EmailValidationError(email);

      expect(error.name).toBe('EmailValidationError');
      expect(error.email).toBe(email);
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it('should provide user-friendly message', () => {
      const error = new EmailValidationError('invalid');
      const userMessage = error.getUserMessage();
      
      expect(userMessage).toContain('valid email address');
      expect(userMessage).toContain('StrathSpace');
    });
  });
});