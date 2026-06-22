# Energy Hive - Deployment & Setup Guide

## 🚀 Quick Start

### Option 1: Local Testing
1. Download all files from the project folder
2. Open `index.html` directly in your web browser
3. The website will work immediately without any server setup

### Option 2: Local Server (Recommended for Testing)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js with http-server
npx http-server
```
Then navigate to `http://localhost:8000`

---

## 🌐 Deployment Options

### Option A: Netlify (Recommended - Free)

**Benefits:**
- Free hosting with custom domain
- Automatic HTTPS
- Fast CDN
- Easy updates

**Steps:**
1. Go to https://netlify.com
2. Sign up with GitHub/Email
3. Click "New site from Git" or drag-and-drop files
4. Select the project folder
5. Configure build settings (leave empty for static sites)
6. Deploy!

### Option B: Vercel

**Steps:**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import the project
4. Deploy automatically

### Option C: GitHub Pages (Free)

**Steps:**
1. Create a GitHub repository
2. Push your files to the repo
3. Go to Settings → Pages
4. Set source to "main" branch
5. Your site will be live at `username.github.io/Energy-Hive-Web-2`

### Option D: Shared Hosting (Bluehost, GoDaddy, HostGator)

**Steps:**
1. Upload files via FTP/File Manager
2. Point domain to hosting
3. Configure DNS settings
4. Enable HTTPS if available

### Option E: Cloud Platforms

**AWS Amplify:**
```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify publish
```

**Google Firebase:**
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## 🔧 Pre-Deployment Checklist

### Content Updates
- [ ] Replace [Your Name] with actual creator name
- [ ] Replace [Your School Name] with institution name
- [ ] Update [Your City], [Your Country] with location
- [ ] Update contact email and phone
- [ ] Add actual images to gallery section
- [ ] Update social media links

### Technical Optimization
- [ ] Optimize all images (reduce file size)
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test dark/light mode toggle
- [ ] Test contact form
- [ ] Check accessibility with screen readers

### SEO & Meta Tags
- [ ] Update page title
- [ ] Update meta description
- [ ] Update Open Graph tags for social sharing
- [ ] Add favicon
- [ ] Submit sitemap to Google Search Console

### Performance
- [ ] Test page load speed (Google PageSpeed Insights)
- [ ] Enable gzip compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Use CDN if available

### Security
- [ ] Enable HTTPS/SSL
- [ ] Set security headers
- [ ] Validate all form inputs
- [ ] Secure any backend endpoints
- [ ] Keep dependencies updated

---

## 📊 Analytics Setup

### Google Analytics 4

Add this code to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add your website
3. Verify ownership
4. Submit sitemap
5. Monitor search performance

---

## 📧 Contact Form Setup

### Option 1: Email Service (Formspree)

Replace the form submission in `script.js`:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            showNotification('Error sending message', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error sending message', 'error');
    }
});
```

### Option 2: Backend API

Create a backend endpoint and update the form handler:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        subject: contactForm.querySelector('input[placeholder="Subject"]').value,
        message: contactForm.querySelector('textarea').value
    };
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        }
    } catch (error) {
        showNotification('Error sending message', 'error');
    }
});
```

---

## 🎨 Customization After Deployment

### Change Colors
1. Open `styles.css`
2. Find `:root` section (line 8-15)
3. Update color values
4. Save and redeploy

### Change Fonts
Add custom fonts in `<head>` of `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap" rel="stylesheet">
```

Then update `styles.css`:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

### Add Images
Replace placeholders in gallery:

```html
<!-- Before -->
<div class="gallery-placeholder">
    <i class="fas fa-image"></i>
    <p>Prototype Model</p>
</div>

<!-- After -->
<img src="images/prototype.jpg" alt="Prototype Model" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;">
```

---

## 📱 Mobile Optimization

### Add Favicon
Save a favicon image (32x32px) as `favicon.ico` in the root folder, then add to `<head>`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

### App Icon (Android)
```html
<link rel="icon" sizes="192x192" href="icon-192.png">
```

### iOS Icon
```html
<link rel="apple-touch-icon" href="icon-180.png">
```

---

## 🔍 SEO Best Practices

### Meta Tags
Update in `<head>`:
```html
<title>Energy Hive - Portable Solar-Powered Energy & Cooling Hub</title>
<meta name="description" content="Your description here">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta property="og:image" content="path/to/image.jpg">
```

### Sitemap (Optional)
Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

---

## 🚨 Troubleshooting

### Website not loading
- Check file paths in HTML
- Ensure all CSS and JS files are in correct locations
- Clear browser cache (Ctrl+Shift+Delete)

### Styles not applying
- Verify CSS file path in HTML
- Check for typos in class names
- Clear browser cache

### JavaScript not working
- Check browser console for errors (F12)
- Verify script.js path in HTML
- Check that jQuery is not required (we use vanilla JS)

### Contact form not submitting
- Check form validation
- Verify email service configuration
- Check browser console for errors

### Mobile menu not working
- Clear cache
- Check JavaScript console for errors
- Test in incognito/private mode

---

## 📈 Performance Tips

### Image Optimization
Use online tools like:
- https://tinypng.com - Compress PNG/JPG
- https://imageoptim.com - Mac image optimization
- https://squoosh.app - Google's image compressor

### CSS Minification
```bash
# Using online tools
# https://cssminifier.com/

# Or using tools like csso-cli
npm install -g csso-cli
csso styles.css -o styles.min.css
```

### JavaScript Minification
```bash
# Using online tools
# https://javascript-minifier.com/

# Or using tools like uglify-js
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

### Enable Compression
Most hosting services auto-enable gzip. For manual setup:
- Apache: Add to `.htaccess`
- Nginx: Configure in `nginx.conf`
- Cloud: Usually auto-enabled

---

## 🔐 Security Recommendations

1. **HTTPS**: Always use SSL/TLS certificate
2. **Input Validation**: Validate all form inputs
3. **CORS**: Configure properly if using API
4. **CSP**: Implement Content Security Policy
5. **Rate Limiting**: Protect API endpoints
6. **Updates**: Keep all dependencies updated

---

## 📞 Support Resources

- MDN Web Docs: https://developer.mozilla.org
- CSS Tricks: https://css-tricks.com
- Stack Overflow: https://stackoverflow.com
- GitHub Issues: Report bugs and request features

---

**Your Energy Hive website is ready for the world! 🌍✨**

Good luck with the competition!
