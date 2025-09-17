/**
 * Phone number formatting and validation utilities
 * Supports international formats and provides real-time formatting
 */

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except +
  const cleaned = value.replace(/[^\\d+]/g, '');
  
  // Handle international format starting with +
  if (cleaned.startsWith('+')) {
    const digits = cleaned.substring(1);
    
    // Format based on common international patterns
    if (digits.length <= 3) {
      return `+${digits}`;
    } else if (digits.length <= 6) {
      return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else if (digits.length <= 10) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}`;
    }
  }
  
  // Handle US/Canada format (10-11 digits)
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const digits = cleaned.substring(1);
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else if (cleaned.length > 10) {
    // International format without + prefix
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return cleaned;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): { isValid: boolean; message?: string; format?: string } => {
  const cleaned = phone.replace(/[^\\d+]/g, '');
  
  if (!cleaned) {
    return { isValid: false, message: "Phone number is required" };
  }
  
  // International format validation
  if (cleaned.startsWith('+')) {
    const digits = cleaned.substring(1);
    if (digits.length < 7) {
      return { isValid: false, message: "International number too short" };
    }
    if (digits.length > 15) {
      return { isValid: false, message: "International number too long" };
    }
    if (!/^\d+$/.test(digits)) {
      return { isValid: false, message: "Invalid characters in phone number" };
    }
    return { isValid: true, format: "international" };
  }
  
  // US/Canada format validation
  if (cleaned.length === 10) {
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(cleaned)) {
      return { isValid: false, message: "Invalid US phone number format" };
    }
    return { isValid: true, format: "us" };
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const areaCode = cleaned.substring(1, 4);
    const exchange = cleaned.substring(4, 7);
    if (areaCode.startsWith('0') || areaCode.startsWith('1') || 
        exchange.startsWith('0') || exchange.startsWith('1')) {
      return { isValid: false, message: "Invalid US phone number format" };
    }
    return { isValid: true, format: "us" };
  }
  
  // Other international formats
  if (cleaned.length >= 7 && cleaned.length <= 15) {
    return { isValid: true, format: "international" };
  }
  
  return { 
    isValid: false, 
    message: cleaned.length < 7 ? "Phone number too short" : "Phone number too long" 
  };
};

export const getPhoneNumberPlaceholder = (format?: string): string => {
  switch (format) {
    case "us":
      return "(555) 123-4567";
    case "international":
      return "+1 555 123 4567";
    default:
      return "+1 (555) 123-4567";
  }
};

export const extractDigitsOnly = (phone: string): string => {
  return phone.replace(/[^\\d]/g, '');
};

export const validatePhone = (phone: string): boolean => {
  return validatePhoneNumber(phone).isValid;
};
  const cleaned = phone.replace(/[^\\d+]/g, '');
  
  if (cleaned.startsWith('+')) {
    return 'international';
  }
  
  if (cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))) {
    return 'us';
  }
  
  if (cleaned.length >= 7 && cleaned.length <= 15) {
    return 'international';
  }
  
export const detectPhoneFormat = (phone: string): 'us' | 'international' | 'unknown' => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+')) {
    return 'international';
  }
  
  if (cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))) {
    return 'us';
  }
  
  if (cleaned.length >= 7 && cleaned.length <= 15) {
    return 'international';
  }
  
  return 'unknown';
};
