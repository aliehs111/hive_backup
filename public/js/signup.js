const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector("#signup_username").value.trim();
      const password = document.querySelector("#signup_password").value.trim();
  
    if (user_name && password) {
      if (password.length < 8) {
        showErrorMsg("Password must be at least 8 characters long");
      }
  
      try {
        const response = await fetch("/api/userRoutes", {
          method: "POST",
          body: JSON.stringify({ user_name, email, password }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          // After successful signup, perform login
          document.location.replace("/dashboard");
          console.log("Success");
        } else {
          showErrorMsg("Login failed. Try again.");
        }
      } catch (error) {
        showErrorMsg("Login failed. Try again.");
      }
    }
  };
  
  const login = async (user_name, password) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user_name, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        showErrorMsg("Failed to log in");
        return
      }
      document.location.replace("/dashboard");
    } catch (error) {
      showErrorMsg("Failed to log in");
    }
  };
  
  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    if (user_name && password) {
      if (password.length < 8) {
        showErrorMsg("Password must be at least 8 characters long");
      }
  
      await login(user_name, password);
     
    }
  };
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
  