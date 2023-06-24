document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById("content");
  var textTutorial = document.getElementById("text-tutorial-type");
  var videoTutorial = document.getElementById("video-tutorial-type");
  var duration = document.getElementById("duration");
  var requiredSpan = document.createElement("span");

  requiredSpan.className = "requiredFields";

  textTutorial.addEventListener("change", updateContent);
  videoTutorial.addEventListener("change", updateContent);

  function updateContent() {
    if (textTutorial.checked) {

      var urlInput = document.createElement("input");
      urlInput.type = "url";
      urlInput.id = "content";
      urlInput.name = "content";
      urlInput.placeholder = "Geben Sie die URL hier ein";

      content.replaceWith(urlInput);

      content = urlInput;
      if(requiredSpan.parentNode){
        requiredSpan.remove();
      }
    } else if (videoTutorial.checked) {
      var textarea = document.createElement("textarea");
      textarea.id = "video";
      textarea.name = "video";
      textarea.required = true;
      textarea.placeholder = "Video Link";

      content.replaceWith(textarea);

      content = textarea;

      duration.after(requiredSpan);
    }
  }
});
