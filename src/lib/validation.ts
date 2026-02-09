export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const MOBILE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export const INTERNATIONAL_MOBILE_REGEX = /^[\+]?[1-9][\d]{6,14}$/;

export const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true
  };
};

export const validateMobile = (mobile: string): ValidationResult => {
  if (!mobile || mobile.trim() === '') {
    return {
      isValid: false,
      error: 'Mobile number is required'
    };
  }

  const cleanMobile = mobile.replace(/[^\d+]/g, '');
  
  if (!INTERNATIONAL_MOBILE_REGEX.test(cleanMobile)) {
    return {
      isValid: false,
      error: 'Please enter a valid mobile number (7-15 digits)'
    };
  }

  return {
    isValid: true
  };
};

export const validateIndianMobile = (mobile: string): ValidationResult => {
  if (!mobile || mobile.trim() === '') {
    return {
      isValid: false,
      error: 'Mobile number is required'
    };
  }

  const cleanMobile = mobile.replace(/\D/g, '');
  
  if (!INDIAN_MOBILE_REGEX.test(cleanMobile)) {
    return {
      isValid: false,
      error: 'Please enter a valid Indian mobile number (10 digits starting with 6-9)'
    };
  }

  return {
    isValid: true
  };
};

export const formatMobileNumber = (mobile: string): string => {
  const cleanMobile = mobile.replace(/\D/g, '');
  
  if (cleanMobile.length === 10) {
    return `+91 ${cleanMobile.slice(0, 5)} ${cleanMobile.slice(5)}`;
  }
  
  return mobile;
};


export const generateRandomId = (length: number = 20): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateRandoOTP = (): string => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      return otp;} 


export const generateRandomUserId = (): string => {
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  const timePart = Date.now().toString().slice(-6); // last 6 digits of timestamp
  return `${randomPart}${timePart}`;
}

export const validateTextarea = (text: string, minLength: number = 50, maxLength?: number): ValidationResult => {
  if (!text || text.trim() === '') {
    return {
      isValid: false,
      error: 'This field is required'
    };
  }

  const trimmedText = text.trim();
  const length = trimmedText.length;

  if (length < minLength) {
    return {
      isValid: false,
      error: `Please enter at least ${minLength} characters (currently ${length})`
    };
  }

  // Only validate max length if it's provided
  if (maxLength && length > maxLength) {
    return {
      isValid: false,
      error: `Please keep your response under ${maxLength} characters (currently ${length})`
    };
  }

  return {
    isValid: true
  };
};

export const validateURL = (url: string): ValidationResult => {
  if (!url || url.trim() === '') {
    return {
      isValid: false,
      error: 'URL is required'
    };
  }

  const trimmedUrl = url.trim();
  const urlToTest = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')
    ? trimmedUrl
    : `https://${trimmedUrl}`;

  try {
    new URL(urlToTest);
    if (!URL_REGEX.test(trimmedUrl) && !URL_REGEX.test(urlToTest)) {
      return {
        isValid: false,
        error: 'Please enter a valid URL (e.g., https://example.com)'
      };
    }

    return {
      isValid: true
    };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL (e.g., https://example.com)'
    };
  }
};