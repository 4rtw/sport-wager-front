import {FormControl} from '@angular/forms';

export class Validator{
    getErrorMessage(formControl: FormControl): string{

        if (formControl.hasError('email')){
            return 'L\' email est invalide';
        }

        if (formControl.hasError('required')) {
            return 'You must enter a value';
        }

        if (formControl.hasError('pattern')){
            return 'Ce champ doit commencer par une lettre majuscule';
        }
    }
}
