document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to login page immediately
  if (!token) {
    window.location.href = "front.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("userInfo").textContent = `Welcome, ${data.user.name}! (${data.user.email})`;
    } else {
      // Invalid/expired token
      localStorage.removeItem("token");
      window.location.href = "front.html";
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "front.html";
}