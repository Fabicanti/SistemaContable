import Swal from "sweetalert2";

export const AlertModal = (title, message, type) => {
  
    return (
      Swal.fire({
        title: title,
        text: message,
        icon: type,
      }))
  };