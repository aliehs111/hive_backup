document.addEventListener("DOMContentLoaded", () => {
  // This code will run when the DOM is fully loaded
  document
    .querySelector("#create-event-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const eventName = document.querySelector("#event-name").value;
      const eventVenue = document.querySelector("#event-venue").value;
      const eventTime = document.querySelector("#event-time").value;

      const newEventData = {
        eventName,
        eventVenue,
        eventTime,
      };

      try {
        const response = await fetch("/api/eventRoutes", {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEventData),
        });

        if (response.ok) {
          const data = await response.json();
          window.location.replace("/dashboard");
          // Redirect to a new page or perform other actions
        } else {
          showErrorMsg("Error creating event. Try again.");
        }
      } catch (error) {
        showErrorMsg("Error creating event. Try again.");
      }
    });
});

