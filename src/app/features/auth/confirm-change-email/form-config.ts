import { FormConfig, FormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';
import { SaveCancelButtonConfig } from '@models/form/button';

import { VerificationCodeValidation } from '@utils/validation/verification-code-validation';

export const buildFormConfig: () => FormConfig = () => {
    const formName = 'form';
    const formTitle = 'Confirm Email Change';
    const submit = new SaveCancelButtonConfig({
        save: 'Submit',
        showCancel: false,
    });
    const verificationCode = new FormField<IInputField>({
        name: 'verificationCode',
        fieldType: 'input',
        label: 'Verification Code',
        fieldConfig: new InputField({ inputType: 'number' }),
        validation: [
            VerificationCodeValidation.validVerificationCode(true),
        ],
    });
    const controls = [verificationCode];

    return new FormConfig({
        formName,
        formTitle,
        submit,
        controls,
    });
}