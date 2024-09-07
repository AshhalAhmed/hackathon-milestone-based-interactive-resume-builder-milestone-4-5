// TypeScript file: app.ts
// Select elements
var resumeForm = document.getElementById('resumeForm');
var resumeOutput = document.getElementById('resumeOutput');
var resumeContent = document.getElementById('resumeContent');
var formSection = document.getElementById('formSection');
// Function to create a PDF file as a Blob
function createPDFContent(content) {
    var pdfHeader = "\n        <html>\n        <head>\n            <style>\n                body { font-family: 'Arial', sans-serif; }\n                h1 { color: #2980B9; }\n                h2, h3, h4 { color: #333; }\n                p { margin: 0 0 10px; }\n                .skills span { background-color: #ECF0F1; padding: 5px 10px; border-radius: 5px; }\n            </style>\n        </head>\n        <body>\n            ".concat(content, "\n        </body>\n        </html>\n    ");
    return new Blob([pdfHeader], { type: 'application/pdf' });
}
// Event listener for form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Generate resume content
    resumeContent.innerHTML = "\n        <h1>Resume of ".concat(name, "</h1>\n        <h2>Contact Information</h2>\n        <p>Email: ").concat(email, "</p>\n        <h2>Education</h2>\n        <p>").concat(education, "</p>\n        <h2>Work Experience</h2>\n        <p>").concat(experience, "</p>\n        <h2>Skills</h2>\n        <p>").concat(skills.split(',').map(function (skill) { return "<span>".concat(skill.trim(), "</span>"); }).join(', '), "</p>\n    ");
    // Show resume output section and hide form
    resumeOutput.style.display = 'block';
    formSection.style.display = 'none';
    // Update URL with name parameter
    var url = new URL(window.location.href);
    url.searchParams.set('username', name);
    history.pushState(null, '', url);
    // Share button functionality
    var shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(url.toString()).then(function () {
                alert("Resume link copied to clipboard: ".concat(url));
            });
        });
    }
    // Download button functionality
    var downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            // Create PDF content
            var pdfBlob = createPDFContent(resumeContent.innerHTML);
            var pdfUrl = URL.createObjectURL(pdfBlob);
            // Create a link element and simulate a click to download the PDF
            var link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'resume.pdf';
            link.click();
            // Clean up
            URL.revokeObjectURL(pdfUrl);
        });
    }
    // Edit button functionality
    var editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function () {
            // Show form and hide resume output
            formSection.style.display = 'block';
            resumeOutput.style.display = 'none';
            // Clear input fields for editing
            document.getElementById('name').value = name;
            document.getElementById('email').value = email;
            document.getElementById('education').value = education;
            document.getElementById('experience').value = experience;
            document.getElementById('skills').value = skills;
        });
    }
});
// Clear the name field on page load
window.onload = function () {
    document.getElementById('name').value = '';
};
