<script>
  import { goto } from "$app/navigation";
  import { createEventDispatcher, onMount } from "svelte";
  import { showAlert } from "../utils/utils";
  const dispatch = createEventDispatcher();

  let coaches = [];
  let error = "";

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3000/coaches");
      coaches = await response.json();
    } catch (error) {
      console.error("Error fetching coaches:", error.message);
    }
  });

  const handleCoachClick = (coachId) => {
    dispatch('coachSelected', coachId);
  };

  // const connectToCoach = async (coachId) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     const response = await fetch(
  //       `http://localhost:3000/coaches/${coachId}/connect`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({}),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to connect to coach");
  //     }
  //     const result = await response.json();
  //     showAlert("Connected to coach successfully!", "success");
  //   } catch {
  //     console.error("Error connecting to coach:", error.message);
  //     showAlert("Failed to connect to coach. Please try again.", "danger");
  //   }
  // };

  const connectToCoach = async (coachId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      // Check if the user is already connected to the selected coach
      const alreadyConnected = coaches.some(coach => coach.connected && coach.connected.includes(coachId));
      if (alreadyConnected) {
        showAlert("Already connected to this coach!", "warning");
        return;
      }
      
      const response = await fetch(
        `http://localhost:3000/coaches/${coachId}/connect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to connect to coach");
      }
      const result = await response.json();
      showAlert("Connected to coach successfully!", "success");
    } catch (err) {
      console.error("Error connecting to coach:", err.message);
      showAlert("Failed to connect to coach. Please try again.", "danger");
    }
  };
</script>

<div class="container">
  <div class="row">
    <div class="col-sm-3" />
    <div class="col-sm-6 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h1>COACHES LIST</h1>
            <button
              on:click={() => goto("/studentlist")}
              class="btn btn-link btn-sm">Go to Student's Coach List</button
            >
          </div>
          <table class="table table-bordered table-hover mt-2">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Specialization</th>
                <th scope="col">Connect To Coach</th>
              </tr>
            </thead>
            <tbody>
              {#each coaches as coach (coach.id)}
                <tr>
                  <th scope="row">{coach.id}</th>
                  <td>{coach.name}</td>
                  <td>{coach.specialization}</td>
                  <td>
                    <button
                      on:click={() => connectToCoach(coach.id)}
                      class="btn btn-info btn-sm"
                    >
                      Connect
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-sm-3" />
  </div>
</div>
