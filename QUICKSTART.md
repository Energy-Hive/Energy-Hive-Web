# Energy Hive Website - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Open the Website
1. Locate the folder with website files
2. Double-click `index.html`
3. Your website opens in the default browser ✅

### Step 2: Test Features
- Click navigation links - they scroll smoothly to sections
- Toggle dark/light mode with moon icon in top-right
- Click "Explore Solution" button in hero section
- Resize window to test mobile responsiveness
- Fill out contact form (success message appears)

### Step 3: Customize for Competition
This section covers the ESSENTIAL customizations needed before submission.

---

## 🎯 Essential Customization

### 1. Update Your Information (5 minutes)

**Open:** `index.html`

**Find and Replace:**
```
[Your Name]              → Your full name
[Your School Name]       → Your institution name
[Your City]              → Your location city
[Your Country]           → Your location country
+91 XXXX-XXXX-XXXX      → Your actual phone number
contact@energyhive.com   → Your email address
```

**Location in file:**
- Around line 400 (Team Section)
- Around line 450 (Contact Information)

### 2. Add Your Images (10 minutes)

**Option A: Using URLs**
If you have images online, add image URLs to gallery:

Find the Gallery Section (around line 320) and replace:
```html
<div class="gallery-placeholder">
    <i class="fas fa-image"></i>
    <p>Prototype Model</p>
</div>
```

With:
```html
<img src="https://example.com/image.jpg" 
     alt="Prototype Model" 
     style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
```

**Option B: Using Local Images**
1. Create an `images` folder in your project directory
2. Add your images to this folder
3. Reference them in HTML:
```html
<img src="images/prototype.jpg" alt="Prototype Model" 
     style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
```

### 3. Update Social Media Links (3 minutes)

Find the footer section (around line 475) and update:
```html
<a href="https://linkedin.com/in/yourprofile" class="social-icon">
    <i class="fab fa-linkedin"></i>
</a>
<a href="https://twitter.com/yourprofile" class="social-icon">
    <i class="fab fa-twitter"></i>
</a>
```

---

## 🎨 Design Customizations

### Change Primary Color

**Current:** Green (#22C55E)

**To Change:**
1. Open `styles.css`
2. Find line 8: `--primary-green: #22C55E;`
3. Replace with your color hex code
4. Save and refresh browser

**Other colors to customize:**
```css
:root {
    --primary-green: #22C55E;      /* Main brand color */
    --solar-yellow: #FACC15;       /* Accent/energy color */
    --white: #FFFFFF;              /* Light backgrounds */
    --dark-gray: #111827;          /* Dark text/mode */
    --light-gray: #F3F4F6;         /* Light backgrounds */
}
```

### Change Fonts

Add Google Fonts in `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet">
```

Then in `styles.css`, find `body` style and change:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

### Adjust Animation Speed

Find in `styles.css`:
```css
@keyframes slideUp {
    ...
}
```

Change `0.8s` to desired duration:
- Slower: `1.2s`
- Faster: `0.4s`

---

## 📱 Mobile Testing

### Test on Your Device
1. Find your computer's IP address
2. Run local server (see DEPLOYMENT.md)
3. On mobile, visit: `http://YOUR_IP:8000`
4. Test all interactive features

### Test in Browser
**Chrome/Edge:**
- Press `F12` to open Developer Tools
- Click device icon (top-left)
- Select different device sizes

**Firefox:**
- Press `Ctrl+Shift+M` for responsive mode
- Test various screen sizes

---

## 📝 Content Updates

### Update Hero Section
**File:** `index.html` (around line 65)

```html
<h1 class="hero-title">Energy Hive</h1>
<p class="hero-subtitle">Your subtitle here</p>
<p class="hero-tagline">Your tagline here</p>
```

### Update Problem Section
**File:** `index.html` (around line 130)

Each problem card has:
- Icon (emoji or icon code)
- Title
- Description

Edit text while keeping HTML structure.

### Update Solution Features
**File:** `index.html` (around line 180)

Each feature card:
```html
<div class="feature-icon">⚡</div>
<h3>Feature Title</h3>
<p>Feature description</p>
```

### Update Impact Statistics
**File:** `index.html` (around line 310)

```html
<div class="impact-card">
    <div class="impact-number" data-target="50">0</div>
    <div class="impact-unit">%</div>
    <h3>Metric Name</h3>
    <p>Description</p>
</div>
```

Change `data-target="50"` to your actual number.

### Update Team Information
**File:** `index.html` (around line 400)

```html
<p class="team-name">[Your Name]</p>
<p class="team-desc">Your description</p>
```

### Update Mission Statement
**File:** `index.html` (around line 425)

```html
<p>Your mission statement here. Describe your vision and impact...</p>
```

---

## 🔧 Advanced Customizations

### Add New Section

1. Copy an existing section structure
2. Paste before closing container
3. Update content and styling
4. Add navigation link

**Example:**
```html
<section id="newsection" class="section">
    <div class="container">
        <h2 class="section-title">New Section Title</h2>
        <p class="section-subtitle">Subtitle</p>
        <!-- Your content here -->
    </div>
</section>
```

Then add to navigation:
```html
<a href="#newsection" class="nav-link">New Section</a>
```

### Modify Button Styles

**File:** `styles.css` (around line 290)

```css
.btn-primary {
    background: var(--primary-green);
    color: white;
}

.btn-primary:hover {
    background: transparent;
    color: var(--primary-green);
    /* Add more hover effects */
}
```

### Add Custom CSS

Add before closing `</style>` tag in `styles.css`:

```css
/* Custom styles */
.my-custom-class {
    color: #22C55E;
    font-size: 1.25rem;
    padding: 1rem;
}
```

---

## 🌐 Deploy Your Website

### Quickest Option: Netlify (FREE)

1. Go to https://netlify.com
2. Sign up
3. Drag and drop your project folder
4. Done! You get a live URL instantly

### Alternative: GitHub Pages (FREE)

1. Create GitHub account
2. Create new repository
3. Upload your files
4. Enable GitHub Pages in settings
5. Site lives at `username.github.io/reponame`

See DEPLOYMENT.md for detailed instructions.

---

## ✅ Pre-Competition Checklist

### Content
- [ ] All text customized with your information
- [ ] Images added to gallery section
- [ ] Contact email updated
- [ ] Social media links updated
- [ ] Team names filled in
- [ ] Mission statement personalized

### Testing
- [ ] Website loads in Chrome
- [ ] Website loads in Firefox
- [ ] Website loads in Safari
- [ ] Mobile responsive works
- [ ] Dark/light mode toggle works
- [ ] Navigation links work
- [ ] Contact form works
- [ ] All animations smooth

### Optimization
- [ ] Images are compressed
- [ ] Page loads quickly
- [ ] No broken links
- [ ] No console errors (F12)
- [ ] All text is readable
- [ ] Colors match your branding

### Deployment
- [ ] Website is live online
- [ ] Domain is set up (optional)
- [ ] HTTPS is enabled
- [ ] SEO meta tags updated
- [ ] Analytics configured (optional)

---

## 🎓 Learning Resources

### CSS Changes
- Colors: Update `--primary-green` in `styles.css`
- Fonts: Change `font-family` in `styles.css`
- Spacing: Modify `padding` and `margin` values
- Sizes: Change `width`, `height`, `font-size`

### HTML Changes
- Text: Update content between tags
- Links: Change `href` attributes
- Images: Update `src` attributes
- Classes: Keep class names same (don't change)

### JavaScript (Don't modify unless you know what you're doing)
- Theme toggle: Already implemented
- Animations: Auto-triggered
- Validation: Built-in for forms
- Counters: Auto-animated

---

## 🆘 Troubleshooting

### Website doesn't load
**Solution:**
- Ensure all files are in same folder
- Check file names are correct (case-sensitive on Mac/Linux)
- Try opening in different browser

### Styles not applying
**Solution:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check CSS file path is correct

### Dark mode not working
**Solution:**
- Clear browser cache
- Check if localStorage is enabled
- Try in incognito/private mode

### Forms not submitting
**Solution:**
- Check email is valid format
- Open console (F12) for errors
- Verify all fields are filled
- Contact form is for demo (needs backend setup)

### Mobile menu not working
**Solution:**
- Hard refresh browser
- Close other tabs
- Test in different browser
- Check JavaScript is enabled

---

## 📞 Need More Help?

### Resources
- **Website Guide:** README.md
- **Deployment Help:** DEPLOYMENT.md
- **Feature Details:** FEATURES.md
- **MDN Docs:** https://developer.mozilla.org
- **Stack Overflow:** https://stackoverflow.com

### Quick Links
- Google Fonts: https://fonts.google.com
- Color Picker: https://color-hex.com
- Image Compression: https://tinypng.com
- Online Tools: https://cssminifier.com

---

## 🎉 You're Ready!

Your Energy Hive website is now customized and ready for competition! 

**Next Steps:**
1. ✅ Customize all information
2. ✅ Test thoroughly
3. ✅ Deploy online
4. ✅ Submit to competitions
5. 🏆 Win awards!

---

**Good luck with your Energy Hive project! Powering Lives. Preserving Futures. 🌍✨**
