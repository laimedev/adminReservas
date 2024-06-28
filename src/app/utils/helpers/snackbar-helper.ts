import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { stringify } from 'querystring';

export type SnackBarConfig = MatSnackBarConfig<any> & {msg: string, action?: string}

export class SnackbarHelper {

    static show(snackBar: MatSnackBar, config: SnackBarConfig): void {

        SnackbarHelper.snackSnack(snackBar, config, ['success-snackbar'])

    }

    static error(snackBar: MatSnackBar, config: SnackBarConfig) {
        SnackbarHelper.snackSnack(snackBar, config, ['danger-snackbar'])
    }

    static snackSnack(snackBar: MatSnackBar, config: SnackBarConfig, styles: string[]) {
        let defConfig: SnackBarConfig = {
            msg: '',
            duration: 3000,
            action: '',
            panelClass: styles,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        }

        config = { ...defConfig, ...config }

        snackBar.open(config.msg, config.action, config)
    }
}
