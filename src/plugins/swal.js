import swal from 'sweetalert'

const swalInstance = (entity, callback) => swal({
 title: "Are you sure?",
 text: `Once deleted, you will not be able to recover this ${entity}!`,
 icon: "warning",
 buttons: true,
 dangerMode: true,
}).then((willDelete) => {
 if (willDelete) {
  callback();
  swal(`The ${entity} has been deleted!`, {
   icon: "success",
  });
 }
});

export default swalInstance