<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let students = [];
  let coachName = "";

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/coaches");
      const coachesData = await response.json();
      const coachId = coachesData.length > 0 ? coachesData[0].id : null;
      const studentsResponse = await fetch(
        `http://localhost:3000/coaches/${coachId}/students`
      );
      const responseData = await studentsResponse.json();

      // Extract students and coach name from the response data
      const coach = responseData.coach;
      students = coach.users;
      coachName = coach.name;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  };

  onMount(async () => {
    await fetchData();
  });
</script>

<div class="container">
  <div class="row">
    <div class="col-sm-3" />
    <div class="col-sm-6 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h1>STUDENT'S COACH LIST</h1>
            <button
              on:click={() => goto("/coachlist")}
              class="btn btn-link btn-sm">Go to Coach List</button
            >
          </div>
          <table class="table table-bordered table-hover mt-2">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Coach's Name</th>
              </tr>
            </thead>
            <tbody>
              {#each students as student (student.id)}
                <tr>
                  <th scope="row">{student.id}</th>
                  <td>{student.name}</td>
                  <td>{coachName}</td>
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
