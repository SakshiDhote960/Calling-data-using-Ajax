function loadData(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.responseText);
          let rows = "";
          response.data.forEach((element) => {
            rows += `<tr>
            <td>${element.id}</td>
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td>${element.email}</td>
            <td><span class="badge bg-success rounded-pill d-inline text-warning">Active</span></td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchUserDetail(${element.id})">Edit</button></td>
            </tr>
            `
            });
          document.getElementById("tableBody").innerHTML = rows;
        }
      };
        xhttp.open("GET", "https://reqres.in/api/users?page=2", true);
        xhttp.send();
      }

    function fetchUserDetail(id){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data found",
            showConfirmButton: false,
            timer: 1500
          });
    let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            document.getElementById("edit-firstname").value =
              response.data.first_name;
            document.getElementById("edit-lastname").value =
              response.data.last_name;
            document.getElementById("edit-email").value = response.data.email;
            document.getElementById("editBtn").dataset.val = response.data.id;
            let editmodal = new bootstrap.Modal(
              document.getElementById("editmodal")
            );
            editmodal.show();
          }
        };
        xhttp.open("GET", "https://reqres.in/api/users/" + id, true);
        xhttp.send();
      }
      
loadData();

// edit variable
    let editButton = document.getElementById("editBtn");
    let editFirstname = document.getElementById("edit-firstname");
    let editLastname = document.getElementById("edit-lastname");
    let editEmail = document.getElementById("edit-email");

    function updateUser(){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data Updated",
            showConfirmButton: false,
            timer: 1500
          });
    let id = document.getElementById("editBtn");
    let first_name = editFirstname.value;
    let last_name = editLastname.value;
    let email = editEmail.value;
    let postdata = {
        first_name:first_name,
        last_name:last_name,
        email:email
    };
    let xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "https://reqres.in/api/users/" + id, true);
        
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
          }
        };
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.withCredentials = false;
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhttp.send(JSON.stringify(postdata));
        loadData();
}