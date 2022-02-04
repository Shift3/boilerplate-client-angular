export interface IPattern {
  DIGIT_REGEX: RegExp;
  EMAIL_REGEX: RegExp;
  SYMBOL_REGEX: RegExp;
  US_PHONE_REGEX: RegExp;
  VERIFICATION_CODE: RegExp;
}

export interface IMaskString {
  US_PHONE: string;
}

export interface IConstant {
  initialCopyrightYear: number;
  masks: IMaskString;
  patterns: IPattern;
}

export const Constants: IConstant = {
  initialCopyrightYear: 2020,
  masks: {
    US_PHONE: '(000) 000-0000',
  },
  patterns: {
    DIGIT_REGEX: /[0-9]/,
    EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
    US_PHONE_REGEX: /(^\d{10}$)/,
    VERIFICATION_CODE: /^([1-9]{1}[0-9]{5})$/,
  },
};
