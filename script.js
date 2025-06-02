const button = document.querySelector("button");
const player1Input = document.querySelector(".player1");
const player2Input = document.querySelector(".player2");
const errorElem = document.querySelector(".error");
const successElem = document.querySelector(".success");

const showError = (error) => {
  errorElem.innerHTML = error;
  setTimeout(() => {
    errorElem.innerHTML = "";
  }, 5000);
};
const showSuccess = (success) => {
  successElem.innerHTML = success;
  setTimeout(() => {
    successElem.innerHTML = "";
  }, 5000);
};

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const player1Mail = player1Input.value;
  const player2Mail = player2Input.value;
  if (!player1Mail) {
    showError("Player 1 Mail was not entered");

    return;
  }
  if (!player2Mail) {
    showError("Player 2 Mail was not entered");
    return;
  }

  try {
    button.innerText = "Loading...";
    button.style.opacity = "0.6";

    const response = await fetch(
      "https://clownfish-app-sarff.ondigitalocean.app/start-game",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: [player1Mail, player2Mail],
        }),
      }
    );
    const actualResponse = await response.text();
    if (response.status == 200) {
      showSuccess(actualResponse);
    }
    if (response.status >= 400) {
      showError(actualResponse);
    }
  } catch (e) {
    console.log(e);
  } finally {
    button.innerText = "Start Game!";
    button.style.opacity = "1";
  }
});
