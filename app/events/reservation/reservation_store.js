import alt from '../../alt';
import ReservationActions from './reservation_actions';
import history from '../../history';

class ReservationStore {
  constructor() {
    console.log("ReservationStoreConstructor");
    this.bindActions(ReservationActions);
    this.reservation = {};
    this.reservations = [];
  }

  setEmptyReservation(){
    this.setState(
      {reservation: {
        _id: undefined,
        title: undefined,
        startDate: undefined,
        endDate: undefined
      }});
  }

// GET ONE POST
  onGetReservationSuccess(reservation) {
    this.reservation = reservation;
  }

  onGetReservationFail(message) {
    toastr.error(message);
  }

//GET ALL POSTS
  onGetReservationsSuccess(reservation) {
    this.reservations = reservation;
  }

  onGetReservationsFail(errorMessage) {
    toastr.error(errorMessage);
  }

// DELETE POST
  onDeleteReservationSuccess(data) {
    toastr.success("Message deleted succesfully!");
    history.pushState(null, '/');
  }

  onDeleteReservationFail(errorMessage) {
    toastr.error(errorMessage);
  }

  addComment(comment) {
    this.reservations.forEach((reservation) => {
      if(reservation._id === comment.eventId) {
        reservation.comments.push(comment);
      }
    })
  }

}


export default alt.createStore(ReservationStore);
