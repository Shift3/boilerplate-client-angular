import { FormConfig, FormField } from '@models/form/form';
import { IInputField, InputField } from '@models/form/input';
import { IUserDTO } from '@models/user';
import { SaveCancelButtonConfig } from '@models/form/button';

import { RequiredValidation } from '@utils/validation/required-validation';

export interface IUserProfileFormConfig {
    user: IUserDTO;
}

export const buildFormConfig: (args: IUserProfileFormConfig) => FormConfig = ({
    user,
}) => {
    const formName = 'form';
    const formTitle = 'Update Profile';
    const submit = new SaveCancelButtonConfig({
        save: 'Submit',
        showCancel: false,
    });
    const firstName = new FormField<IInputField>({
        name: 'firstName',
        value: user?.firstName,
        fieldType: 'input',
        label: 'First Name',
        fieldConfig: new InputField({ autocomplete: 'given-name' }),
        validation: [RequiredValidation.required('First Name')],
    });
    const lastName = new FormField<IInputField>({
        name: 'lastName',
        value: user?.lastName,
        fieldType: 'input',
        label: 'Last Name',
        fieldConfig: new InputField({ autocomplete: 'family-name' }),
        validation: [RequiredValidation.required('Last Name')],
    });
    const controls = [firstName, lastName];

    return new FormConfig({
        formName,
        formTitle,
        submit,
        controls,
    });
}