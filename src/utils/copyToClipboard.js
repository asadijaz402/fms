import toast from "react-hot-toast";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success(text + " copied to clipboard.");
};

export default copyToClipboard;
