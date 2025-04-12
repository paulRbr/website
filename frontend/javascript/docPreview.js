export const init = () => {
  handleDefaultTextUrl();
  handleTextUrlFormSubmission();
  handleFileUpload();
};

const handleDefaultTextUrl = () => {
  const input = document.querySelector("#doc-preview-url");
  if (!input) {
    return;
  }
  input.addEventListener("focus", () => {
    if (input.value === input.getAttribute("data-preview-url")) {
      input.select();
    }
  });
};

const handleTextUrlFormSubmission = () => {
  const form = document.querySelector("#doc-preview-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // @TODO: handle url submission
  });
};

const handleFileUpload = () => {
  const fileInput = document.querySelector("#doc-preview-file");
  if (!fileInput) {
    return;
  }
  fileInput.addEventListener("change", (event) => {
    // @TODO: handle file upload
  });
};
