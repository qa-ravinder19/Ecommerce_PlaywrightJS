exports.CommonMethods = 

class CommonMethods {

  // Method to return a formatted date (DD_MM)
  static getFormattedDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    return `${day}_${month}`;
  }

  // Method to return the local time (HH_MM_SS)
  static getLocalTime() {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
    return `${hours}_${minutes}_${seconds}`;
  }
};