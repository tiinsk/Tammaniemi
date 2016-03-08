import alt from '../../alt';
import history from '../../history';
import moment from 'moment';

class ReservationActions {
  constructor() {
    this.generateActions(
      'getReservationsSuccess',
      'getReservationsFail',
      'getReservationSuccess',
      'getReservationFail',
      'deleteReservationSuccess',
      'deleteReservationFail',
      'setEmptyReservation',
      'addComment'
    );
  }

  getReservations(payload) {
    $.ajax({ url: '/api/reservations'})
      .done((data) => {
        this.getReservationsSuccess(data);
      })
      .fail((jqXhr) => {
        this.getReservationsFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  getReservation(reservationId) {
    $.ajax({ url: '/api/reservations/' + reservationId })
      .done((data) => {
        this.getReservationSuccess(data);
      })
      .fail((jqXhr) => {
        this.getReservationFail(jqXhr.responseJSON.message);
      });
      return true;
  }

  addReservation(reservation, jwt) {
    const startDate = moment(reservation.startDate).toDate();
    const endDate = moment(reservation.endDate).toDate();
    $.ajax({
          type: 'POST',
          url: '/api/reservations',
          data: { title: reservation.title, startDate, endDate}
        })
        .done((data) => {
          toastr.success("Message created successfully!");
          history.pushState(null, '/reservations/' +data.id);
        })
        .fail((jqXhr) => {
         toastr.error(jqXhr.responseJSON.message);
        });
        return true;
  }

  updateReservation(reservationId, title, startDate, endDate, jwt) {
    $.ajax({
      type: 'PUT',
      url: '/api/reservations/' + reservationId ,
      headers: {Authorization: 'JWT ' + jwt},
      data: { title: title, startDate: startDate, endDate: endDate}
    })
      .done((data) => {
        toastr.success("Message updated successfully!");
        history.pushState(null, '/reservations/' + reservationId);
      })
      .fail((jqXhr) => {
        toastr.error(jqXhr.responseJSON.message);
      });
      return true;
  }

  deleteReservation(reservationId, jwt) {
    $.ajax({
      type: 'DELETE',
      url: '/api/reservations/' + reservationId ,
      headers: {Authorization: 'JWT ' + jwt}
    })
      .done((data) => {
        console.log('done');
        this.deleteReservationSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('fail');
        this.deleteReservationFail(jqXhr.responseJSON.message);
      });
      return true;
  }
}

export default alt.createActions(ReservationActions);
