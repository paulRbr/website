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
  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.value = input.getAttribute("data-preview-url");
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
  const uploadForm = document.querySelector(".js-docPreviewUpload");
  const fileInput = uploadForm.querySelector("#doc-preview-file");
  if (!uploadForm || !fileInput) {
    return;
  }

  const hideAllDropzones = () => {
    uploadForm.querySelectorAll("div[data-dropzone]").forEach((dropzone) => {
      dropzone.removeAttribute("data-visible");
    });
  };
  const inactiveDropzone = uploadForm.querySelector(
    "div[data-dropzone='initial']"
  );
  const activeDropzone = uploadForm.querySelector("div[data-dropzone='drag']");
  const droppedDropzone = uploadForm.querySelector("div[data-dropzone='drop']");
  const showDropzone = (dropzone) => {
    hideAllDropzones();
    dropzone.setAttribute("data-visible", "true");
  };
  fileInput.addEventListener("dragenter", (event) => {
    fileInput.setAttribute("data-dropzone", "drag");
    showDropzone(activeDropzone);
  });
  fileInput.addEventListener("dragleave", (event) => {
    fileInput.setAttribute("data-dropzone", "initial");
    showDropzone(inactiveDropzone);
  });
  fileInput.addEventListener("change", (event) => {
    fileInput.setAttribute("data-dropzone", "drop");
    showDropzone(droppedDropzone);
    const fileName = event.target.files[0].name;
    const fileNameElement = uploadForm.querySelector("[data-filename]");
    if (fileNameElement) {
      fileNameElement.textContent = fileName;
    }
  });

  uploadForm.addEventListener("reset", (event) => {
    event.preventDefault();
    fileInput.value = "";
    fileInput.setAttribute("data-dropzone", "initial");
    hideAllDropzones();
    showDropzone(inactiveDropzone);
  });

  uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // @TODO: handle file upload
  });
};
