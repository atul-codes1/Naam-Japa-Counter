# 🚀 Japa Counter - Complete Setup Guide

This guide will help you run the Japa Counter React app on your computer, even if you've never used React before!

## 📋 What You Need (Prerequisites)

Before you start, you need to install **Node.js** on your computer.

### Installing Node.js

1. **Go to** https://nodejs.org/
2. **Download** the LTS (Long Term Support) version - the big green button
3. **Run the installer** and follow the installation steps
4. **Verify installation** by opening a terminal/command prompt and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (like v18.17.0 and 9.6.7)

---

## 🎯 Step-by-Step Setup

### Step 1: Download the Project Files

You have received a folder called `japa-counter-react` which contains:
```
japa-counter-react/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── JapaCounter.jsx
│   ├── NaamLibraryPage.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── SETUP_GUIDE.md (this file)
```

### Step 2: Open Terminal/Command Prompt

**On Windows:**
- Press `Windows Key + R`
- Type `cmd` and press Enter

**On Mac:**
- Press `Command + Space`
- Type `terminal` and press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### Step 3: Navigate to Project Folder

In the terminal, navigate to the project folder. For example:

**Windows:**
```bash
cd C:\Users\YourName\Downloads\japa-counter-react
```

**Mac/Linux:**
```bash
cd ~/Downloads/japa-counter-react
```

💡 **Tip:** You can drag and drop the folder into the terminal to auto-fill the path!

### Step 4: Install Dependencies

In the terminal, type:
```bash
npm install
```

This will download all necessary packages. It might take 2-5 minutes.

You'll see a lot of text scrolling - this is normal! ✅

### Step 5: Start the App

Once installation is complete, type:
```bash
npm start
```

The app will automatically open in your default browser at:
```
http://localhost:3000
```

🎉 **That's it! The app is now running!**

---

## 🎮 How to Use the App

1. **Click anywhere** on the screen to count your japa
2. Each click increments the counter
3. The counter automatically resets to 1 after reaching 108
4. View your **Malas**, **Total**, and **Today's** count in the cards below
5. Click **"Naam Library"** to choose a different deity/mantra

---

## ⚡ Quick Commands Reference

| Command | What It Does |
|---------|-------------|
| `npm install` | Installs all dependencies (run once) |
| `npm start` | Starts the development server |
| `npm run build` | Creates a production-ready build |

---

## 🛑 Stopping the App

To stop the app:
1. Go back to the terminal
2. Press `Ctrl + C` (on both Windows and Mac/Linux)
3. Type `Y` if asked to confirm

---

## ❓ Troubleshooting

### Problem: "npm is not recognized" or "command not found"

**Solution:** Node.js is not installed or not in your PATH
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal after installation

### Problem: Port 3000 is already in use

**Solution:** Another app is using port 3000
- Stop other React apps running
- Or use a different port:
  ```bash
  PORT=3001 npm start
  ```

### Problem: "Module not found" errors

**Solution:** Dependencies not installed properly
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Problem: Browser doesn't open automatically

**Solution:** Manually open your browser and go to:
```
http://localhost:3000
```

---

## 📁 Project Structure Explained

```
japa-counter-react/
│
├── public/                  # Static files
│   └── index.html          # Main HTML file
│
├── src/                     # Source code (React components)
│   ├── App.js              # Main app with routing
│   ├── JapaCounter.jsx     # Counter component
│   ├── NaamLibraryPage.jsx # Naam selection page
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
│
├── package.json            # Project configuration & dependencies
├── node_modules/           # Installed packages (created after npm install)
└── build/                  # Production build (created after npm run build)
```

---

## 🌐 Building for Production

When you're ready to deploy your app:

```bash
npm run build
```

This creates a `build/` folder with optimized production files that you can:
- Upload to a web hosting service
- Deploy to Netlify, Vercel, or GitHub Pages
- Serve with any static file server

---

## 🔧 Customization

### Changing Colors

Edit the color values in `JapaCounter.jsx`:
- Find `#880E4F` (deep pink)
- Find `#FF4081` (pink accent)
- Replace with your preferred colors

### Adding More Deities

Edit `NaamLibraryPage.jsx` and add to the `deities` array:
```javascript
{ name: 'YourDeity', hindi: 'हिंदी नाम', icon: '🕉️' }
```

---

## 💡 Tips

- Keep the terminal open while the app is running
- The app will automatically reload when you make changes to the code
- Press `Ctrl + C` in terminal to stop the app
- Use Chrome DevTools (F12) to inspect and debug

---

## 📞 Need More Help?

- **React Documentation:** https://react.dev
- **Node.js Help:** https://nodejs.org/en/docs/
- **npm Documentation:** https://docs.npmjs.com/

---

## ✨ Features Included

✅ Click counting with automatic reset at 108  
✅ Beautiful animated background  
✅ Floating naam text on each click  
✅ Session timer  
✅ Statistics tracking (Malas, Total, Today)  
✅ Multiple deity/mantra options  
✅ Responsive design (works on mobile & desktop)  
✅ Smooth animations and hover effects  

---

Enjoy your spiritual practice! 🙏 📿
