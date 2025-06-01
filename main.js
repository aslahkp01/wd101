 const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    const termsCheckbox = document.getElementById("terms");
    const termsError = document.getElementById("termsError");
    const userTableBody = document.querySelector("#userTable tbody");

  
    function setDOBRange() {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
      dobInput.max = maxDate.toISOString().split("T")[0];
      dobInput.min = minDate.toISOString().split("T")[0];
    }

    setDOBRange();

    
    function getUsersFromStorage() {
      return JSON.parse(localStorage.getItem("registrationUsers")) || [];
    }

    
    function saveUser(user) {
      const users = getUsersFromStorage();
      users.push(user);
      localStorage.setItem("registrationUsers", JSON.stringify(users));
    }
    


    
    function displayUsers() {
      const users = getUsersFromStorage();
      userTableBody.innerHTML = ""; 
      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.dob}</td>
          <td>${user.agreed}</td>
        `;
        userTableBody.appendChild(row);
      });
    }

    
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      dobError.textContent = "";
    termsError.textContent = "";

      const dob = new Date(dobInput.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 18 || age > 55) {
        dobError.textContent = "Age must be between 18 and 55.";
        return;
      } if (!termsCheckbox.checked) {
      termsError.textContent = "You must agree to the Terms and Conditions.";
      return;
    }

      const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dob: dobInput.value,
        agreed: termsCheckbox.checked ? "true" : "false",
      };

      saveUser(userData);
      displayUsers();
      alert("User registered successfully!");
      form.reset(); 
    });

    
    
    window.onload = function () {
  localStorage.removeItem("registrationUsers"); 
  displayUsers();
};