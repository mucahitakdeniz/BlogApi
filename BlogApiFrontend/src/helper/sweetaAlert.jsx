import swal from "sweetalert";

export const notify = (msg, color) =>
  swal({
    text: msg,
    icon: color,
    timer: 2000,
  });
