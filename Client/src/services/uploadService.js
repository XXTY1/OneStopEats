// Import the toast method from react-toastify for displaying notifications
import { toast } from "react-toastify";
// Import axios for making HTTP requests
import axios from "axios";

/**
 * Asynchronously uploads an image file to the server.
 * @param {Event} event - The event object from the file input element.
 * @returns {Promise<string|null>} The URL of the uploaded image or null if the upload fails.
 */
export const uploadImage = async (event) => {
  // Initialize a variable to keep track of the toast notification ID
  let toastId = null;

  // Retrieve the image file from the event using a helper function
  const image = await getImage(event);
  // If no image is retrieved, return null to indicate failure
  if (!image) return null;

  // Create a FormData object to hold the file data for the POST request
  const formData = new FormData();
  // Append the image file to the FormData object
  formData.append("image", image, image.name);

  // Make a POST request to the server to upload the image
  const response = await axios.post("api/upload", formData, {
    // Provide a callback for the onUploadProgress event to update the toast notification
    onUploadProgress: ({ progress }) => {
      // If a toast notification already exists, update its progress
      if (toastId) toast.update(toastId, { progress });
      // Otherwise, create a new toast notification for the upload progress
      else toastId = toast.success("Uploading...", { progress });
    },
  });

  // Once the upload is complete, dismiss the toast notification
  toast.dismiss(toastId);
  // Return the URL of the uploaded image from the server response
  return response.data.imageUrl;
};

/**
 * Helper function to retrieve the selected image file from the event.
 * @param {Event} event - The event object from the file input element.
 * @returns {Promise<File|null>} The selected image file or null if no file is selected or the file type is incorrect.
 */
const getImage = async (event) => {
  // Retrieve the list of files from the event object
  const files = event.target.files;

  // If no files are selected or the files array is empty, display a warning toast and return null
  if (!files || files.length <= 0) {
    toast.warning("Upload file is not selected!", "File Upload");
    return null;
  }

  // Retrieve the first file from the files array
  const file = files[0];

  // If the file type is not JPEG, display an error toast and return null
  if (file.type !== "image/jpeg") {
    toast.error("Only JPG type is allowed", "File Type Error");
    return null;
  }

  // Return the file if it passes the checks
  return file;
};
