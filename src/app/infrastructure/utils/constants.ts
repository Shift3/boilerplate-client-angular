export interface IPattern {
  DIGIT_REGEX: RegExp;
  EMAIL_REGEX: RegExp;
  SYMBOL_REGEX: RegExp;
}

export interface IConstant {
  patterns: IPattern;
  initialCopyrightYear: number;
}

export const Constants: IConstant = {
  patterns:
  {
    DIGIT_REGEX: /[0-9]/,
    EMAIL_REGEX: /^[a-z0-9!#$%&'*+\/=?^_\`{|}~.-]+@[a-z0-9]([a-z0-9-])+(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    SYMBOL_REGEX: /[-+_!@#$%^&*,.?]/,
  },
  initialCopyrightYear: 2020,
};
