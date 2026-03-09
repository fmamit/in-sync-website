// Centralized validation utilities to eliminate duplication

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => ValidationResult;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email || !email.trim()) {
    return { isValid: false, message: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  return { isValid: true };
};

// Phone validation with multiple formats
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || !phone.trim()) {
    return { isValid: false, message: "Phone number is required" };
  }
  
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Indian phone number (10 digits or +91 followed by 10 digits)
  const indianPhoneRegex = /^(\+91)?[6-9]\d{9}$/;
  // US phone number (10 digits or +1 followed by 10 digits)
  const usPhoneRegex = /^(\+1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  // International format (+ followed by 7-15 digits)
  const internationalRegex = /^\+[1-9]\d{6,14}$/;
  
  if (cleaned.startsWith('+91') || (!cleaned.startsWith('+') && cleaned.length === 10)) {
    if (!indianPhoneRegex.test(cleaned)) {
      return { isValid: false, message: "Please enter a valid Indian phone number" };
    }
  } else if (cleaned.startsWith('+1') || (!cleaned.startsWith('+') && cleaned.length === 10)) {
    if (!usPhoneRegex.test(cleaned)) {
      return { isValid: false, message: "Please enter a valid US phone number" };
    }
  } else if (cleaned.startsWith('+')) {
    if (!internationalRegex.test(cleaned)) {
      return { isValid: false, message: "Please enter a valid international phone number" };
    }
  } else {
    return { isValid: false, message: "Please enter a valid phone number with country code" };
  }
  
  return { isValid: true };
};

// Generic field validation
export const validateField = (value: string, rules: ValidationRules, fieldName: string = "Field"): ValidationResult => {
  // Required check
  if (rules.required && (!value || !value.trim())) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  // Skip other validations if field is empty and not required
  if (!value || !value.trim()) {
    return { isValid: true };
  }
  
  // Min length check
  if (rules.minLength && value.length < rules.minLength) {
    return { isValid: false, message: `${fieldName} must be at least ${rules.minLength} characters` };
  }
  
  // Max length check
  if (rules.maxLength && value.length > rules.maxLength) {
    return { isValid: false, message: `${fieldName} must be no more than ${rules.maxLength} characters` };
  }
  
  // Pattern check
  if (rules.pattern && !rules.pattern.test(value)) {
    return { isValid: false, message: `${fieldName} format is invalid` };
  }
  
  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }
  
  return { isValid: true };
};

// Validate form data object
export const validateForm = (
  data: Record<string, string>, 
  rules: Record<string, ValidationRules>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field] || '';
    const fieldRules = rules[field];
    const result = validateField(value, fieldRules, field);
    
    if (!result.isValid && result.message) {
      errors[field] = result.message;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// URL validation
export const validateUrl = (url: string): ValidationResult => {
  if (!url || !url.trim()) {
    return { isValid: false, message: "URL is required" };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, message: "Please enter a valid URL" };
  }
};

// Date validation
export const validateDate = (date: string, futureOnly: boolean = false): ValidationResult => {
  if (!date || !date.trim()) {
    return { isValid: false, message: "Date is required" };
  }
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return { isValid: false, message: "Please enter a valid date" };
  }
  
  if (futureOnly && parsedDate < new Date()) {
    return { isValid: false, message: "Date must be in the future" };
  }
  
  return { isValid: true };
};

// Company/Organization name validation
export const validateCompanyName = (name: string): ValidationResult => {
  return validateField(name, {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-\.&,()]+$/
  }, "Company name");
};

// PAN number validation (Indian)
export const validatePAN = (pan: string): ValidationResult => {
  if (!pan || !pan.trim()) {
    return { isValid: false, message: "PAN number is required" };
  }
  
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan.toUpperCase())) {
    return { isValid: false, message: "Please enter a valid PAN number (e.g., ABCDE1234F)" };
  }
  
  return { isValid: true };
};

// GST number validation (Indian)
export const validateGST = (gst: string): ValidationResult => {
  if (!gst || !gst.trim()) {
    return { isValid: false, message: "GST number is required" };
  }
  
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(gst.toUpperCase())) {
    return { isValid: false, message: "Please enter a valid GST number" };
  }
  
  return { isValid: true };
};

// Format phone number for display
export const formatPhoneDisplay = (phone: string): string => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+91')) {
    const number = cleaned.substring(3);
    return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
  } else if (cleaned.startsWith('+1')) {
    const number = cleaned.substring(2);
    return `+1 (${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  
  return phone;
};

// Clean and normalize input
export const normalizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

// Check for duplicate values in array
export const checkDuplicates = <T>(
  items: T[], 
  getKey: (item: T) => string
): { hasDuplicates: boolean; duplicates: T[] } => {
  const seen = new Set<string>();
  const duplicates: T[] = [];
  
  items.forEach(item => {
    const key = getKey(item).toLowerCase().trim();
    if (seen.has(key)) {
      duplicates.push(item);
    } else {
      seen.add(key);
    }
  });
  
  return {
    hasDuplicates: duplicates.length > 0,
    duplicates
  };
};