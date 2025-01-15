document.getElementById("disableBtn").addEventListener("click", function () {
  const duration = document.getElementById("disableDuration").value;

  chrome.runtime.sendMessage({
    action: "disableTabRemoval",
    duration: duration,
  });

  const statusMessage = `Affiliate removal is disabled for ${duration} minute${
    duration > 1 ? "s" : ""
  }.`;
  document.getElementById("status").textContent = statusMessage;
});

function getstate() {
  chrome.runtime.sendMessage(
    {
      action: "check_state",
    },
    (res) => {
      if (res.message == "disabled") {
        document.querySelector(".message_text").textContent =
          "Affiliate blocker is disabled";
        document.querySelector(".message_text").style.color = "red";
      }
      console.log(res, "this is res");
    }
  );
}
getstate();
