export interface IPattern {
  DIGIT_REGEX: RegExp;
  EMAIL_REGEX: RegExp;
  SYMBOL_REGEX: RegExp;
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
  patterns:
  {
    DIGIT_REGEX: /[0-9]/,
    EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
  },
};
