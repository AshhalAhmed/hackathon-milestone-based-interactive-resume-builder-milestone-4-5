// TypeScript file: app.ts

// Select elements
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;
const resumeContent = document.getElementById('resumeContent') as HTMLElement;
const formSection = document.getElementById('formSection') as HTMLElement;

// Function to create a PDF file as a Blob
function createPDFContent(content: string): Blob {
    const pdfHeader = `
        <html>
        <head>
            <style>
                body { font-family: 'Arial', sans-serif; }
                h1 { color: #2980B9; }
                h2, h3, h4 { color: #333; }
                p { margin: 0 0 10px; }
                .skills span { background-color: #ECF0F1; padding: 5px 10px; border-radius: 5px; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
    return new Blob([pdfHeader], { type: 'application/pdf' });
}

// Event listener for form submission
resumeForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    // Collect input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    // Generate resume content
    resumeContent.innerHTML = `
        <h1>Resume of ${name}</h1>
        <h2>Contact Information</h2>
        <p>Email: ${email}</p>
        <h2>Education</h2>
        <p>${education}</p>
        <h2>Work Experience</h2>
        <p>${experience}</p>
        <h2>Skills</h2>
        <p>${skills.split(',').map(skill => `<span>${skill.trim()}</span>`).join(', ')}</p>
    `;

    // Show resume output section and hide form
    resumeOutput.style.display = 'block';
    formSection.style.display = 'none';

    // Update URL with name parameter
    const url = new URL(window.location.href);
    url.searchParams.set('username', name);
    history.pushState(null, '', url);

    // Share button functionality
    const shareBtn = document.getElementById('shareBtn') as HTMLButtonElement;
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(url.toString()).then(() => {
                alert(`Resume link copied to clipboard: ${url}`);
            });
        });
    }

    // Download button functionality
    const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Create PDF content
            const pdfBlob = createPDFContent(resumeContent.innerHTML);
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Create a link element and simulate a click to download the PDF
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'resume.pdf';
            link.click();

            // Clean up
            URL.revokeObjectURL(pdfUrl);
        });
    }

    // Edit button functionality
    const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            // Show form and hide resume output
            formSection.style.display = 'block';
            resumeOutput.style.display = 'none';

            // Clear input fields for editing
            (document.getElementById('name') as HTMLInputElement).value = name;
            (document.getElementById('email') as HTMLInputElement).value = email;
            (document.getElementById('education') as HTMLTextAreaElement).value = education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = experience;
            (document.getElementById('skills') as HTMLInputElement).value = skills;
        });
    }
});

// Clear the name field on page load
window.onload = () => {
    (document.getElementById('name') as HTMLInputElement).value = '';
};
