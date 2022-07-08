const baseUrl = "https://62ac7a419fa81d00a7b2f6c1.mockapi.io/api/v1/events";

export const fetchEventsList = () => {
  return fetch(baseUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
    return response.json();
  });
};

export const createEvent = (eventData) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};

export const deleteTask = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};

// export const updateTask = (taskId, taskData) => {
//   return fetch(`${baseUrl}/${taskId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(taskData),
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error("Internal Server Error. Can't display events");
//     }
//   });
// };
