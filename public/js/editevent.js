const editPostForm = document.querySelector("#edit-event-form");
const postID = document.querySelector("#event-id").value;

editPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const eventName = document.querySelector("#event-name").value;
  const eventVenue = document.querySelector("#event-venue").value;
  const eventTime = document.querySelector("#event-time").value;

  const editPostData = {
    eventName,
    eventVenue,
    eventTime,
  };
  try {
    const response = await fetch(`/api/posts/${eventID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editEventData),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.replace("/dashboard");
      // Redirect to a new page or perform other actions
    } else {
      showErrorMsg("Error editing event. Try again.");
    }
  } catch (error) {
    showErrorMsg("Error editing event. Try again.");
  }
});

document.querySelector("#del_event").addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`/api/eventRoutes/${postID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.replace("/dashboard");
      // Redirect to a new page or perform other actions
    } else {
      showErrorMsg("Error deleting event. Try again.");
    }
  } catch (error) {
    showErrorMsg("Error deleting event. Try again.");
  }
});
