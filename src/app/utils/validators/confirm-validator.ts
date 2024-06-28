import { AbstractControl } from '@angular/forms';

export function confirmValidator(controlName: string, controlConfirmName: string) {

    return (control: any): {[key: string]: any} | null => {
        let value = control.get(controlName).value
        let confirmValue = control.get(controlConfirmName).value
        if (value == confirmValue) {
            control.get(controlConfirmName).setErrors(null)
        } else {
            control.get(controlConfirmName).setErrors({confirm: true})
        }

        return null
      }

}
