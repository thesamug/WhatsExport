
document.addEventListener('DOMContentLoaded', function() {
  const openAppButton = document.getElementById('openAppButton');
  if (openAppButton) {
    openAppButton.addEventListener('click', function() {
      // IMPORTANT: Replace this URL with the actual URL where your WhatsExport Next.js app is deployed!
      const appUrl = 'https://YOUR_WHATSAPP_EXPORT_APP_URL_HERE.com';
      
      // Define the properties for the new window
      const windowCreateData = {
        url: appUrl,
        type: 'popup', // Creates a window with minimal browser chrome
        width: 800,    // Specify desired width
        height: 600   // Specify desired height
      };

      chrome.windows.create(windowCreateData, function(newWindow) {
        // Optional: You can do something with the newWindow object here, like focus it
        if (newWindow) {
          chrome.windows.update(newWindow.id, { focused: true });
        }
      });

      window.close(); // Close the extension's popup itself after clicking
    });
  }
});
