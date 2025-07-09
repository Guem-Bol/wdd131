

 document.addEventListener('DOMContentLoaded', function() {
            // Last Modified Date
            const lastModifiedElement = document.getElementById("lastModified");
            if (lastModifiedElement) {
                lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
            }

            // Current Year for Copyright
            const currentYearElement = document.getElementById("currentYear");
            if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear();
            }
        });