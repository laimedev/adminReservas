import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { LoginService } from 'src/app/services/security/login.service';
import { environment } from 'src/environments/environment';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import * as moment from 'moment';
import esLocale from '@fullcalendar/core/locales/es';
import { ReserveService } from '../services/reserve.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ReservaEditComponent } from '../modals/reserva-edit/reserva-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('reservationModal') reservationModal: any;


  idClientePublic: number = 0;

  tipoFutbol: any = 7;



  public variables: any[] = [];
  public filteredList5: any[] = [];
    
  public codSucursalSelect: number = 1;
  public nameClientSelect: any = '';


  public localidad: any = [];
  public sucursal: any = [];
  public localidadSelect = 2;

  
  userDataJson: string | null | undefined;
  isLoading: boolean | undefined;
  isLoading2: boolean | undefined;
  spinner: any;

  showReservationForm = false;
  reservationForm: any = {
    clientId: null,
    locationId: null,
    startDateTime: null,
    endDateTime: null,
    price:null,
    comment: '',
    timeGame:null,
    }


    public valor: number = 50; // Inicializamos el valor en 50
    isSumaDisabled: boolean = false; // Indica si el botón de suma está deshabilitado
    isRestaDisabled: boolean = true; // Indica si el botón de resta está deshabilitado
    payload: {
      ddUsuario: number;
      ddlClientes: any;
      ddlSucursal: any;
      ddlLocalidad: number;
      ddCaja: number;
      txtFecha: string;
      txtHoraInicial: string;
      txtHoraFinal: string;
      txtTiempo: any;
      estado: string;
      pago: number;
      txtComentario: any;
      costoTarifa: any;
      created_at: string;
      updated_at: string;
      venta_id:string;
      version:string;
      typeFutbolId: number;
     } | undefined;
    codRegistro: any;
    clickPage: boolean = false;
    codigoUnico: any;
    

  today = new Date()
  user?: string
  typeUser
  idPersonal




  calendarVisible = true;

  calendarOptions: CalendarOptions = {

    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
        // right: 'timeGridDay'
      right: 'timeGridDay,timeGridWeek,dayGridMonth,listMonth'
    },
    initialView: 'timeGridDay',
    events: [],
    //hiddenDays: this.getHiddenDays(),
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    select: this.handleEventsDate.bind(this),
    slotMinTime: '06:00:00',
    slotMaxTime: '22:00:00',
    slotDuration: '00:60:00',
    contentHeight: 'auto',
    selectLongPressDelay: 0,
    locale: esLocale,
    selectAllow: function(selectInfo) {
      // Obtener la duración de la selección en minutos
      const duration = (selectInfo.end.getTime() - selectInfo.start.getTime()) / (1000 * 60);
      // Permitir solo selecciones de 50 minutos
      return duration === 60 || duration === 120 ;
    },

    slotLabelFormat: [
      { hour: 'numeric', minute: '2-digit', hour12: true, meridiem: 'short'},
      { month: 'short', day: 'numeric', weekday: 'short' }
    ],
    //nowIndicator: true,

  };

  currentEvents: EventApi[] = [];


  constructor(protected loginService: LoginService,
    public reserveServices: ReserveService,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
    public router: Router,
    public http: HttpClient,
    // private toastr: ToastrService,
    private docTitleService: Title) {
    this.user = loginService.getLogin()?.nombre
    this.typeUser = this.loginService.getLogin()?.role
    this.idPersonal = loginService.getLogin()?.id

    this.obetenerCLientes();

   }

  ngOnInit(): void {
    this.obetenerCLientes();
    this.loadEvents();
    this.obetenerLocalidades();
   

    this.docTitleService.setTitle('Inicio - ' + environment.appTitle)
  }




  formatDateTime(dateTimeString: string): string {
    return moment(dateTimeString).format('YYYY-MM-DDTHH:mm');
  }
  





  obetenerLocalidades() {
    // Mostrar el spinner de carga
   this.reserveServices.getLocalidad(this.codSucursalSelect).subscribe(
     (resp: any) => {
      console.log('localidades');
      console.log(resp);
       this.localidad = resp.data;

       this.localidadSelect = this.localidad[0].codLocalidad;
        // Ocultar el spinner de carga
     },
     (error: any) => {
       console.log(error);
       // Ocultar el spinner de carga
     }
   );
 }




 updateLocalidad(event: any){
  console.log(event.value);
  this.localidadSelect = event.value;
  this.loadEvents();

  // const selectedLocalidadName = event.target.selectedOptions[0].textContent.trim();
  // this.isFutbol = !selectedLocalidadName.includes('VOLEY');
  // this.isVoley  = !selectedLocalidadName.includes('VOLEY');
  // this.tipoFutbol = this.isFutbol ? 7 : 7;
  // this.checkboxes.forEach((checkbox) => {
  //   checkbox.selected = false;
  // });
  // this.checkboxes[0].selected = true;

}




loadEvents() {
  this.isLoading = true;
  this.reserveServices.obetenerReservas(this.localidadSelect).subscribe(
    (data: any[]) => {
      const events = data.map((item) => ({
        id: item.id,
        title: item.title,
        start: formatDate(item.start),
        end: formatDate(item.end),
        backgroundColor: item.backgroundColor,
        textColor: item.textColor,
        extendedProps: item.extendedProps
      }));
      this.isLoading = false;
      this.calendarOptions.events = events;
      this.changeDetector.detectChanges();
    },
    (error: any) => {
      console.log('Error fetching events:', error);
      this.isLoading = false;
    }
  );

  function formatDate(dateString: string): Date {
    const parts = dateString.split(' '); // Separar por espacios
    const formattedDate = `${parts[1]} ${parts[2]} ${parts[3]} ${parts[9]}`; // Formato: 'May 22 2023 12:00:00'
    return moment(formattedDate, 'MMM DD YYYY HH:mm:ss').toDate();
  }
  
}





handleEventClick(clickInfo: EventClickArg) {


  console.log('Evento clicado:', clickInfo);
  // const eventId = clickInfo.event.id;
  // const eventTitle = clickInfo.event.title;
  // const eventStart = clickInfo.event.start;
  // const eventEnd = clickInfo.event.end;

  // console.log('Evento clicado:', eventId, eventTitle, eventStart, eventEnd);
  
  // Swal.fire({
  //   //icon: 'error',
  //   title: 'Fecha no válida',
  //   text: 'La fecha ya fue seleccionada.',
  // });
}

handleEvents(events: EventApi[]) {
  this.currentEvents = events;
  this.changeDetector.detectChanges();
}


 handleEventsDate(clickDate: DateSelectArg) {


  console.log('Fecha seleccionada:', clickDate);

  const selectedDateTime = moment(clickDate.start.toISOString());
  const selectedDateTimeEnd = moment(clickDate.end.toISOString());

  const formattedDateTime = selectedDateTime.format('YYYY-MM-DD');
  const formattedDateHours = selectedDateTime.format('HH:mm:ss');
  // const formatDateTimeEnd = selectedDateTimeEnd.format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDateTime);
console.log(formattedDateHours);
console.log(this.localidadSelect)
// console.log('Fecha formateada:', formatDateTimeEnd);



  if (selectedDateTime.isSameOrAfter(moment(), 'minute')) {
    // if (this.userDataJson) {
      const dayOfWeek = selectedDateTime.day();
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
      const isSaturday = dayOfWeek === 6;
      const isSunday = dayOfWeek === 0;

      let isWithinValidTimeRange = false;
      if (isWeekday) {
        isWithinValidTimeRange = selectedDateTime.isBetween(
          selectedDateTime.clone().set('hour', 6).set('minute', 0),
          selectedDateTime.clone().set('hour', 22).set('minute', 0),
          'minute',
          '[)'
        );
      } else if (isSaturday) {
        isWithinValidTimeRange = selectedDateTime.isBetween(
          selectedDateTime.clone().set('hour', 6).set('minute', 0),
          selectedDateTime.clone().set('hour', 20).set('minute', 0),
          'minute',
          '[)'
        );
            // Limitar la selección de horas en sábado hasta las 8 PM
      if (selectedDateTimeEnd.get('hour') > 20) {
        isWithinValidTimeRange = false;
      }
      } else if (isSunday) {
        isWithinValidTimeRange = selectedDateTime.isBetween(
          selectedDateTime.clone().set('hour', 6).set('minute', 0),
          selectedDateTime.clone().set('hour', 18).set('minute', 0),
          'minute',
          '[)'
        );
        if (selectedDateTimeEnd.get('hour') > 18) {
          isWithinValidTimeRange = false;
        }
      }

      /*if (isWithinValidTimeRange) {
        this.showReservationForm = true;
        //const startDateTime = moment(clickDate.start.toISOString()).subtract(5, 'minutes').toISOString();
        this.reservationForm.startDateTime = this.formatDateTime(clickDate.start.toISOString());
        //this.reservationForm.startDateTime = this.formatDateTime(startDateTime);
        const endDateTime = moment(clickDate.end.toISOString()).subtract(5, 'minutes').toISOString();
        this.reservationForm.endDateTime = this.formatDateTime(endDateTime);
        //this.reservationForm.timeGame = this.calculateTimeDuration(
        //  new Date(this.reservationForm.startDateTime),
        //  new Date(this.reservationForm.endDateTime)
        //);
        this.validateDateReserve(
          this.formatTime(this.reservationForm.startDateTime),
          this.formatDate(this.reservationForm.startDateTime),
          this.formatTime(this.reservationForm.endDateTime)
        );

      }*/
      if (isWithinValidTimeRange) {
        this.showReservationForm = true;
          this.reservationForm.startDateTime = this.formatDateTime(clickDate.start.toISOString());
          const endDateTime = moment(clickDate.end.toISOString()).subtract(10, 'minutes').toISOString();
          this.reservationForm.endDateTime = this.formatDateTime(endDateTime);
          //this.reservationForm.timeGame = this.calculateTimeDuration(
          //  new Date(this.reservationForm.startDateTime),
          //  new Date(this.reservationForm.endDateTime)
          //);


          const dataSearch = {
            codLocalidad: this.localidadSelect,
            fechRegistro: formattedDateTime,
            horainicio: formattedDateHours
          }
        
        console.log(dataSearch);
        
        
        this.reserveServices.searchReserva(dataSearch).subscribe(
          (resp: any) => {
            console.log(resp);
            if (resp['ok'] === true) {
              console.log('okkkkkkkkkkk');


              const modalRef = this.modalService.open(ReservaEditComponent, { size: 'lg', backdrop: 'static', centered: true });
              modalRef.componentInstance.data = resp.registro
              modalRef.result.then(res => {
                // this.empleadoService.fetch();
              })


            } else {


              this.validateDateReserve(
                this.formatTime(this.reservationForm.startDateTime),
                this.formatDate(this.reservationForm.startDateTime),
                this.formatTime(this.reservationForm.endDateTime)
              );
            }
          },
          (error) => {
            console.error('Error en la solicitud:', error);
            // Puedes agregar un console.log('queweeeeeeeeee') aquí para verificar si se ejecuta en caso de error
          }
        );

          
         
      }else {
        Swal.fire({
          title: 'Horario no válido',
          text: 'Las reservas están permitidas de lunes a viernes de 6 am a 10 pm, los sábados de 6 am a 8 pm y los domingos de 6 am a 6 pm.',
        });
      }
    // }
    
    // else {
    //   Swal.fire({
    //     title: 'Es necesario iniciar sesión o registrarse',
    //     text: 'Para poder reservar una cancha, por favor inicie sesión o registre una cuenta.',
    //     showCancelButton: true,
    //     confirmButtonText: 'Iniciar sesión',
    //     cancelButtonText: 'Cancelar',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.router.navigate(['reserve/login']); // Redireccionar al inicio de sesión
    //     }
    //   });
    // }
  } else {
    Swal.fire({
      title: 'Fecha no válida',
      text: 'No se puede seleccionar una fecha anterior a la fecha actual.',
      confirmButtonText: 'Ok, entendido', // Texto del botón de confirmación
      customClass: {
        confirmButton: 'btn btn-primary', // Clase CSS para el botón de confirmación
      },
    });
  }
}










validateDateReserve(horainicio: any, fechRegistro: any, horafinal: any) {
  // const userData = JSON.parse(this.userDataJson ? this.userDataJson : '');

   if(this.idClientePublic == 0) {
    Swal.fire({
      // icon: 'warning',
      title: 'Seleccione un usuario',
      text: 'Es importante seleccionar un usuario para registrar una reserva.',
      confirmButtonText: 'Ok, entendido', // Texto del botón de confirmación
      customClass: {
        confirmButton: 'btn btn-primary', // Clase CSS para el botón de confirmación
      },
    });

   }  else {
    this.isLoading = true;
    const validationEndpoint = `${environment.baseUrl}registro-cliente/validar-Fecha-reserva`;
    const validationPayload = {
      txtFecha: fechRegistro,
      txtHoraInicial: horainicio,
      txtHoraFinal: horafinal,
      ddlLocalidad: this.localidadSelect,
      typeFutbolId: this.tipoFutbol
  
    };
    console.log({ validationPayload })
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${userData.token}`
    //   })
    // };
  
    this.http.post(validationEndpoint, validationPayload).subscribe(
      (response: any) => {
        if (response.ok) {
          // Si la reserva es válida, puedes continuar con el resto del flujo
          this.isLoading = false;
          this.validateCountReserve(
            this.formatDate(this.reservationForm.startDateTime),
            this.formatTime(this.reservationForm.startDateTime),
            this.formatTime(this.reservationForm.endDateTime)
          );
        } else {
          Swal.fire({
            title: 'Reserva no válida',
            text: response.error,
          });
          this.isLoading = false;
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error en la reserva',
          text: error.error.error,
        });
        this.isLoading = false;
        this.loadEvents()
      }
    );
   }

 
}




validateCountReserve(fechRegistro: any,horainicio: any,  horafinal: any) {
  this.isLoading = true;
  const validationEndpoint = `${environment.baseUrl}registro-cliente/validar-cantidad-reserva`;
  const validationPayload = {
    txtFecha: fechRegistro,
    ddlLocalidad: this.localidadSelect,
    ddlClientes: this.idClientePublic,
    txtHoraInicial: horainicio,
    txtHoraFinal: horafinal,
  };
  this.http.post(validationEndpoint, validationPayload ).subscribe(
    (response: any) => {
      if (response.ok) {
        // Si la reserva es válida, puedes continuar con el resto del flujo
        this.isLoading = false;
        // ... continuar con el flujo de reserva
        this.validatePrice(
          this.formatTime(this.reservationForm.startDateTime),
          this.formatDate(this.reservationForm.startDateTime),
          this.formatTime(this.reservationForm.endDateTime)
        );
      }
    },
    (error: any) => {
      Swal.fire({
        title: 'Error en la reserva',
        text: error.error.error,
      });
      // Manejar el error si es necesario
      this.isLoading = false;

      return false
    }
  );
}






validatePrice(horainicio: any, fechRegistro: any, horafinal: any) {
  // capi alex laime edit
  this.isLoading = true;
  // const userData = JSON.parse(this.userDataJson?this.userDataJson:"");
  const priceEndpoint = `${environment.baseUrl}registro-cliente/cal-price-time`;
  const pricePayload = {
    fechRegistro: fechRegistro,
    horainicio: horainicio,
    horafinal: horafinal,
    codCliente: this.idClientePublic,
    codLocalidad: this.localidadSelect,
    typeFutbolId: this.tipoFutbol
  };

  this.http.post(priceEndpoint, pricePayload ).subscribe(
    (response: any) => {
      //const precio = response.precioBase;
      // Aquí puedes usar el precio obtenido para realizar cualquier acción necesaria antes de guardar la reserva
      let priceTime = response.resultado //this.calPriceTime(this.reservationForm.startDateTime,this.reservationForm.endDateTime,precio)
      this.reservationForm.price=response.resultado.resultado
      this.reservationForm.timeGame = `${response.resultado.duracion} minuto(s)`

      console.log(this.reservationForm.price)
      this.showReservationForm = true; // Mostrar el formulario de reserva
      this.openReservationModal();
    //this.openPaymentModal()
      // Continuar con el proceso de guardar la reserva...
      this.isLoading = false
    },
    (error: any) => {
      console.log('Error obteniendo el precio:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error obteniendo el precio:',
        text: error,
      });


      // Manejar el error si es necesario
      this.isLoading = false
    }
  );
}




formatDate(dateString: string): string {
  return moment(dateString).format('YYYY-MM-DD');
}

formatTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  return dateTime.toTimeString().split(' ')[0];
}


generateOrderId() {
    const timestamp = moment().format("ss");
    const randomDigits = Math.floor(Math.random() * 100000000);
    const randomLetters = this.generateRandomLetters(4); // Genera 4 letras aleatorias
    const orderId = (parseInt(timestamp) * 100000000 + randomDigits).toString().substr(0, 4) + this.idClientePublic + randomLetters;

    return orderId;
  }

generateRandomLetters(length: number) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define las letras posibles
    let randomLetters = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomLetters += letters.charAt(randomIndex);
    }

    return randomLetters;
  }


submitReservationForm3() {
  this.codigoUnico = this.generateOrderId()
  this.isLoading2 = true;
  // this.userDataJson = localStorage.getItem('userData');
  // const userData = JSON.parse(this.userDataJson?this.userDataJson:"");
  this.payload = {
    ddUsuario: 1,
    ddlClientes: this.idClientePublic,
    ddlLocalidad: this.localidadSelect,
    ddlSucursal: this.codSucursalSelect,
    ddCaja: 7,
    txtFecha: this.formatDate(this.reservationForm.startDateTime),
    txtHoraInicial: this.formatTime(this.reservationForm.startDateTime),
    txtHoraFinal: this.formatTime(this.reservationForm.endDateTime),
    txtTiempo: this.reservationForm.timeGame,
    estado: 'SIN CONFIRMAR',
    pago: 0,
    txtComentario: this.reservationForm.comment,
    costoTarifa:this.reservationForm.price,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    venta_id: this.codigoUnico,
    version:environment.version,
    typeFutbolId: this.tipoFutbol
  };
  console.log(this.payload)



  this.isLoading2 = false;

this.izipay();

}










izipay() {
  this.isLoading = true;
  this.http.post(
  `${environment.urlPayment}createPayment`,
  {
      paymentConf: {
        amount: JSON.stringify(this.reservationForm.price * 100),
        currency: 'PEN',
        orderId: this.codigoUnico,
        customer: {
          email: 'alaimes64@gmail.com'
      }

      },

    },

    { responseType: 'text' }
  );
  this.crearRegistro()
  this.modalService.dismissAll()
}


crearRegistro() {
    return new Promise<void>((resolve, reject) => {
    const url = `${environment.baseUrl}registro-cliente/guardar`;

    this.http.post(url, this.payload).subscribe(
      (response:any) => {
        Swal.fire({
          icon: 'success',
          text: 'Reserva guardada con éxito:',
          confirmButtonText: 'Ok, entendido' });
        // Swal.
        // this.ngOnInit

        console.log(response);
        this.codRegistro = response.codRegistro

        this.loadEvents();
        this.obetenerLocalidades();

        resolve(); // Resolver la promesa cuando se haya guardado el registro
      },
      (error) => {
        console.log('Error al guardar la reserva:', error.error);
        Swal.fire({
          icon: 'warning',
          text: `${error.error.error}`,
          confirmButtonText: 'Ok, entendido',
        }).then(() => {
          // location.reload(); // Utilizar window.location.reload() en lugar de location.reload()
        });
        reject(error); // Rechazar la promesa en caso de error
      }
    );
  });

}



openReservationModal() {
  this.modalService.open(this.reservationModal, { centered: true }); // Abre el modal utilizando la referencia
}

obetenerCLientes(){
  this.reserveServices.getClientes().subscribe(resp => {
    this.variables = resp.data;
    this.filteredList5 = this.variables.slice();
  })
}




onSelectionChange(event: any) {
  console.log('Valor seleccionado:', event.value);
  this.nameClientSelect = event.value.nombreCompletoConDNI;
  this.idClientePublic = event.value.codCliente;
  console.log(this.idClientePublic);
}




}
