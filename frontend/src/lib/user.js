export function getUserData() {
  return localStorage.getItem("user_details");
}

export function isUserDataExists() {
  const result = localStorage.getItem("user_details");
  return !(result == undefined || result === "");
}

/**
 * @param {object} data
 */
export function setUserData(data) {
  return localStorage.setItem("user_details", JSON.stringify(data));
}
