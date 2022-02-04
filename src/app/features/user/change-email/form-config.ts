import { FormConfig, FormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';
import { IUserDTO } from '@models/user';
import { SaveCancelButtonConfig } from '@models/form/button';

import { EmailValidation } from '@utils/validation/email-validation';
import { NotSameEmailValidation } from '@utils/validation/not-same-email-validation';

export interface IUserEmailFormConfig {
    user: IUserDTO;
}

export const buildFormConfig: (args: IUserEmailFormConfig) => FormConfig = ({
    user,
}) => {
    const formName = 'form';
    const formTitle = user?.newEmail ? '' : 'Update Email';
    const submit = new SaveCancelButtonConfig({
        save: 'Submit',
        showCancel: false,
    });
    const email = new FormField<IInputField>({
        name: 'email',
        value: user?.email,
        fieldType: 'input',
        label: 'Email',
        fieldConfig: new InputField({
          inputType: 'email',
          autocomplete: 'email',
        }),
        validation: [
            EmailValidation.validEmail(true),
            NotSameEmailValidation.validNotSameEmail(user?.email),
        ],
    });
    const controls = [email];

    return new FormConfig({
        formName,
        formTitle,
        submit,
        controls,
    });
}