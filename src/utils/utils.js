
export function showAlert(message, type) {

  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3 p-2`;
  alertElement.style.maxHeight = "60px";


  alertElement.innerHTML = `
    <strong>${type === "success" ? "Success!" : "Error:"}</strong> ${message}
  `;

  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}
