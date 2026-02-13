# 🧪 Quick Test Instructions

## The backend IS working! Let's verify the frontend connection:

### Step 1: Open Browser Console
1. Go to http://localhost:3000
2. Press **F12** to open DevTools
3. Click on the **Console** tab
4. Keep it open

### Step 2: Try Screening a Resume

1. **Login** (any email/password)

2. **Go to "Screen Resume" page**

3. **Paste this job description:**
```
Senior Full Stack Developer

We are seeking an experienced Full Stack Developer with:
- 5+ years of professional experience
- Strong proficiency in React and Node.js
- TypeScript expertise
- AWS cloud platform experience
- Docker containerization skills
- Database experience (PostgreSQL, MongoDB)
- GraphQL and REST API development
- CI/CD pipeline knowledge

Nice to have:
- Kubernetes experience
- Terraform infrastructure as code
- Python or Java background
```

4. **Upload a resume:**
   - Use the test-resume.txt file in the project root
   - Or any PDF/DOCX resume you have

5. **Click "Run AI Screening"**

### Step 3: Watch the Console

You should see these logs:
```
Starting resume analysis...
File: test-resume.txt Size: 1234 Type: text/plain
Job description length: 456
FormData created, sending to backend...
Response received: 200 OK
Analysis result: {candidate: {...}, score: 84, ...}
✅ Resume analysis complete!
```

### If You See An Error:

**"Failed to fetch"** or **"Cannot connect"**
- Backend server stopped
- Solution: Run `cd server && node server.js` in a terminal

**"Server error: 500"**  
- Resume file format issue
- Try a different file (PDF or DOCX)

**Alert shows but no console logs**
- Browser cache issue
- Press **Ctrl+Shift+R** to hard reload

**Results not showing**
- Check the Console tab for errors
- Copy and send me the error message

### Backend Server Status:

Check if backend is running:
```powershell
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok","mode":"keyword","timestamp":"..."}
```

### What Should Happen:

1. ✅ Processing animation with 4 steps
2. ✅ Results appear with:
   - Candidate score (0-100)
   - Category badge (Strong/Consider/Reject)
   - Matched skills (green tags)
   - Missing skills (red tags)
   - AI summary paragraph
3. ✅ "Screen Another Resume" button

### Still Not Working?

**Take a screenshot of:**
1. The browser console (F12 → Console tab)
2. The error message (if any)
3. The Screen Resume page

And I'll help debug!

---

**Backend logs show it IS working** - you've already successfully analyzed several resumes! The issue is likely just a browser refresh needed or a console error.

Try **Ctrl+Shift+R** (hard reload) on the frontend and try again! 🚀
