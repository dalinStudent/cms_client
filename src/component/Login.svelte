<script>
  import { goto } from "$app/navigation";
  import { showAlert } from "../utils/utils";

  let username = "";
  let password = "";
  let error = "";
  let isLoginDisabled = true;
  let loginSuccess = false;

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/coaches/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data && data.token) {
        const token = data.token;
        localStorage.setItem("jwtToken", token);
        error = "";
        loginSuccess = true;
        showAlert("Login successfully!", "success");
        goto("/coachlist");
      } else {
        loginSuccess = false;
        if (response.status === 401 || response.status === 500) {
          showAlert("Invalid Credentail. Please try again.", "danger");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      loginSuccess = false;
    }
  };
  $: isLoginDisabled = !username || !password;
</script>

<div class="container justify-content-center align-items-center vh-100">
  <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm mt-5">
      <div class="card">
        <div class="card-header">
          <h1>Login Form</h1>
        </div>
        <div class="card-body">
          <form on:submit|preventDefault={handleLogin}>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                bind:value={username}
                required
                on:input={() => (error = "")}
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                bind:value={password}
                required
                on:input={() => (error = "")}
              />
            </div>
            <button
              type="submit"
              class="btn btn-outline-primary mt-2 btn-sm"
              on:click={handleLogin}
              disabled={isLoginDisabled}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="col-sm"></div>
  </div>
</div>
