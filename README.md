# ArrayGrade — Student Marks & Grade Calculator

A small responsive web application for a Data Structures assignment. It demonstrates arrays using JavaScript.

## Features
- Add student names and three marks (0–100)
- Calculate averages and letter grades
- Show class average and top performer
- Search and remove student records
- Save records in browser local storage
- Export records as CSV
- Load sample records for a quick demonstration

## How arrays are used
- `students` is an array of student objects.
- Each student object contains a `marks` array.
- `students.push(...)` adds a new student.
- `filter(...)` searches and removes records.
- `reduce(...)` calculates averages.
- `map(...)` builds the table and CSV output.

## Run locally
Open `index.html` in a web browser. Keep `style.css` and `script.js` in the same folder as `index.html`; the HTML file links to both files. No installation or server is required.

## Publish with GitHub Pages
1. Sign in to GitHub and create a **new public repository**, for example `arraygrade-assignment`.
2. Choose **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` from this folder, then commit the files to the `main` branch.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then click **Save**.
7. Wait a minute or two and refresh Settings → Pages. GitHub will show a website URL similar to `https://YOUR-USERNAME.github.io/arraygrade-assignment/`.
8. Open the published URL in a private/incognito browser window to verify it works, then submit that URL to your lecturer.

Important: the public preview made for this assignment is available separately in ChatGPT. The GitHub Pages URL is created only after you complete the steps above in your own GitHub account.


## Project structure
```text
arraygrade/
├── index.html   # Page structure and content
├── style.css    # Layout, colours, and responsive styling
├── script.js    # Student records, calculations, search, and export
└── README.md    # Project and deployment instructions
```
