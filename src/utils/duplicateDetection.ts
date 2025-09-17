/**
 * Duplicate detection utilities for form validation
 * Helps prevent duplicate entries in user tables and other form sections
 */

interface ValidationItem {
  value: string;
  index: number;
  field: string;
}

export const findDuplicateEmails = (emails: string[]): number[] => {
  const duplicateIndices: number[] = [];
  const emailMap = new Map<string, number[]>();
  
  emails.forEach((email, index) => {
    if (email && email.trim()) {
      const normalizedEmail = email.toLowerCase().trim();
      if (!emailMap.has(normalizedEmail)) {
        emailMap.set(normalizedEmail, []);
      }
      emailMap.get(normalizedEmail)!.push(index);
    }
  });
  
  emailMap.forEach((indices) => {
    if (indices.length > 1) {
      duplicateIndices.push(...indices);
    }
  });
  
  return duplicateIndices;
};

export const findDuplicatePhones = (phones: string[]): number[] => {
  const duplicateIndices: number[] = [];
  const phoneMap = new Map<string, number[]>();
  
  phones.forEach((phone, index) => {
    if (phone && phone.trim()) {
      // Normalize phone number by removing all non-digits except +
      const normalizedPhone = phone.replace(/[^\d+]/g, '');
      if (normalizedPhone.length >= 7) {
        if (!phoneMap.has(normalizedPhone)) {
          phoneMap.set(normalizedPhone, []);
        }
        phoneMap.get(normalizedPhone)!.push(index);
      }
    }
  });
  
  phoneMap.forEach((indices) => {
    if (indices.length > 1) {
      duplicateIndices.push(...indices);
    }
  });
  
  return duplicateIndices;
};

export const validateUniqueFields = (items: ValidationItem[]): {
  isValid: boolean;
  duplicates: { field: string; indices: number[]; value: string }[];
  message?: string;
} => {
  const fieldMap = new Map<string, Map<string, number[]>>();
  
  // Group by field type
  items.forEach(({ value, index, field }) => {
    if (value && value.trim()) {
      if (!fieldMap.has(field)) {
        fieldMap.set(field, new Map());
      }
      
      const valueMap = fieldMap.get(field)!;
      const normalizedValue = field === 'email' 
        ? value.toLowerCase().trim()
        : field === 'phone'
        ? value.replace(/[^\d+]/g, '')
        : value.trim();
      
      if (!valueMap.has(normalizedValue)) {
        valueMap.set(normalizedValue, []);
      }
      valueMap.get(normalizedValue)!.push(index);
    }
  });
  
  const duplicates: { field: string; indices: number[]; value: string }[] = [];
  
  fieldMap.forEach((valueMap, field) => {
    valueMap.forEach((indices, value) => {
      if (indices.length > 1) {
        duplicates.push({ field, indices, value });
      }
    });
  });
  
  return {
    isValid: duplicates.length === 0,
    duplicates,
    message: duplicates.length > 0 
      ? `Found ${duplicates.length} duplicate ${duplicates.length === 1 ? 'entry' : 'entries'}`
      : undefined
  };
};

export const checkEmailDuplicate = (email: string, existingEmails: string[], currentIndex?: number): boolean => {
  if (!email || !email.trim()) return false;
  
  const normalizedEmail = email.toLowerCase().trim();
  return existingEmails.some((existing, index) => {
    if (currentIndex !== undefined && index === currentIndex) return false;
    return existing && existing.toLowerCase().trim() === normalizedEmail;
  });
};

export const checkPhoneDuplicate = (phone: string, existingPhones: string[], currentIndex?: number): boolean => {
  if (!phone || !phone.trim()) return false;
  
  const normalizedPhone = phone.replace(/[^\d+]/g, '');
  if (normalizedPhone.length < 7) return false;
  
  return existingPhones.some((existing, index) => {
    if (currentIndex !== undefined && index === currentIndex) return false;
    if (!existing || !existing.trim()) return false;
    
    const normalizedExisting = existing.replace(/[^\d+]/g, '');
    return normalizedExisting === normalizedPhone;
  });
};

export const generateDuplicateMessage = (field: string, duplicates: { indices: number[]; value: string }[]): string => {
  if (duplicates.length === 0) return '';
  
  const fieldName = field === 'email' ? 'Email' : field === 'phone' ? 'Phone' : field;
  
  if (duplicates.length === 1) {
    const { indices, value } = duplicates[0];
    const userNumbers = indices.map(i => i + 1).join(', ');
    return `${fieldName} "${value}" is duplicated in users: ${userNumbers}`;
  }
  
  return `Multiple ${fieldName.toLowerCase()} duplicates found. Please ensure all entries are unique.`;
};

export const highlightDuplicateFields = (
  duplicates: { field: string; indices: number[] }[],
  currentIndex: number,
  currentField: string
): boolean => {
  return duplicates.some(dup => 
    dup.field === currentField && dup.indices.includes(currentIndex)
  );
};