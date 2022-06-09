import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Toaster = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default Toaster;