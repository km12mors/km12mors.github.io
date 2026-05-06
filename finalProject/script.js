const GEMINI_MODEL = "gemini-3-flash-preview"; 
const API_KEY = "AIzaSyAvc1fCH58xUnO8pOjF2-UWvr5lYJua9WY"; 

function saveFormData() {
    const name = document.getElementById("name")?.value || "";
    const education = document.getElementById("education")?.value || "";
    const work = document.getElementById("work-exp")?.value || "";
    const skills = document.getElementById("skills")?.value || "";
    const title = document.getElementById("title")?.value || "";
    const description = document.getElementById("description")?.value || "";

    localStorage.setItem("name", name);
    localStorage.setItem("education", education);
    localStorage.setItem("work", work);
    localStorage.setItem("skills", skills);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
}

const resumeBtn = document.getElementById("resumeBtn");
if (resumeBtn) {
    resumeBtn.addEventListener("click", async function () {
        resumeBtn.innerText = "Generating...";
        resumeBtn.disabled = true;
        
        saveFormData();
        try {
            await generateResume();
            window.location.href = "resume.html";
        } catch (error) {
            console.error(error);
            alert("AI generation failed. Please check your API key or connection.");
        } finally {
            resumeBtn.innerText = "Generate Resume";
            resumeBtn.disabled = false;
        }
    });
}

const coverBtn = document.getElementById("coverBtn");
if (coverBtn) {
    coverBtn.addEventListener("click", async function () {
        coverBtn.innerText = "Generating...";
        coverBtn.disabled = true;

        saveFormData();
        try {
            await generateCoverLetter();
            window.location.href = "coverletter.html";
        } catch (error) {
            console.error(error);
            alert("AI generation failed.");
        } finally {
            coverBtn.innerText = "Generate Cover Letter";
            coverBtn.disabled = false;
        }
    });
}

async function generateResume() {
    const name = localStorage.getItem("name");
    const education = localStorage.getItem("education");
    const work = localStorage.getItem("work");
    const skills = localStorage.getItem("skills");

    const prompt = `
        Create a professional resume using:
        Name: ${name}
        Education: ${education}
        Work Experience: ${work}
        Skills: ${skills}

        Format strictly with these sections:
        - Professional Summary
        - Experience
        - Education
        - Skills
    `;

    const aiResponse = await callGemini(prompt);
    localStorage.setItem("aiResume", aiResponse);
}

async function generateCoverLetter() {
    const prompt = `
        Write a professional cover letter for:
        Name: ${localStorage.getItem("name")}
        Education: ${localStorage.getItem("education")}
        Experience: ${localStorage.getItem("work")}
        Skills: ${localStorage.getItem("skills")}

        Applying for: ${localStorage.getItem("title")}
        Job Description: ${localStorage.getItem("description")}
    `;

    const aiResponse = await callGemini(prompt);
    localStorage.setItem("aiCover", aiResponse);
}

// Reusable function to handle API calls
async function callGemini(promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: promptText }]
            }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "API Error");
    }

    const data = await response.json();
    
    // Check if the response contains content (to avoid crashes from safety filters)
    if (data.candidates && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("No response from AI. It may have been filtered.");
    }
}