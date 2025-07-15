# 📰 NewsHub - Modern News Aggregator

A beautiful, responsive news aggregator built with React, Vite, and Tailwind CSS. Stay informed with the latest news from around the world, powered by NewsAPI.

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Beautiful UI** - Red-themed gradients and modern card designs
- **Smooth Animations** - Hover effects and loading animations

### 📱 **User Experience**
- **Real-time News** - Get the latest news from trusted sources
- **Category Filtering** - Browse by Technology, Business, Entertainment, Health, Science, Sports
- **Advanced Search** - Search for specific topics and articles
- **Bookmark System** - Save important articles for later reading
- **Responsive Navigation** - Mobile-optimized header with hamburger menu

### 🔧 **Technical Features**
- **Fast Performance** - Built with Vite for lightning-fast development
- **Modern Stack** - React 18, Tailwind CSS, Lucide Icons
- **State Management** - Context API for theme and bookmarks
- **Toast Notifications** - Beautiful notification system
- **Pagination** - Smooth page navigation for large article sets

## 🚀 Live Demo

[View Live Demo](https://your-project-name.vercel.app)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** NewsAPI
- **Deployment:** Vercel
- **State Management:** React Context API
- **Notifications:** Custom Toast System

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- NewsAPI key (free at [newsapi.org](https://newsapi.org))

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/newshub.git
   cd newshub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Add your NewsAPI key to `.env`:
   ```env
   VITE_NEWS_API_KEY=your_news_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
newshub/
├── public/
│   ├── news.png
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── badge.jsx
│   │   │   └── sonner.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── ArticleModal.jsx
│   │   ├── BookmarksList.jsx
│   │   └── PaginationControls.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   └── BookmarkContext.jsx
│   ├── hooks/
│   │   └── use-toast.js
│   ├── services/
│   │   └── newsService.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Key Features Explained

### **News Aggregation**
- Fetches real-time news from NewsAPI
- Supports multiple categories and search functionality
- Responsive grid layout for articles

### **Bookmark System**
- Save articles for later reading
- Persistent storage using localStorage
- Easy access through header button

### **Theme System**
- Dark/Light mode toggle
- Smooth theme transitions
- Persistent theme preference

### **Mobile Responsiveness**
- Optimized for all screen sizes
- Touch-friendly interface
- Mobile navigation menu

## 🌐 API Integration

This project uses the [NewsAPI](https://newsapi.org) for fetching news data. The API provides:

- **Real-time news** from trusted sources
- **Multiple categories** (Technology, Business, Entertainment, etc.)
- **Search functionality** for specific topics
- **Pagination support** for large datasets

### API Endpoints Used
- `GET /v2/top-headlines` - Latest news by category
- `GET /v2/everything` - Search articles

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `VITE_NEWS_API_KEY`

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://your-project.vercel.app`

### Environment Variables

Make sure to set these in your deployment platform:

```env
VITE_NEWS_API_KEY=your_news_api_key_here
```

## 🎨 Customization

### **Colors**
The app uses a red-themed color palette. To customize:

1. Update `tailwind.config.js`:
   ```javascript
   theme: {
     extend: {
       colors: {
         primary: {
           50: '#fef2f2',
           // ... your custom colors
         }
       }
     }
   }
   ```

2. Update gradient classes in components

### **Styling**
- All styles use Tailwind CSS
- Custom CSS in `src/App.css`
- Component-specific styles in respective files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org) for providing the news data
- [Vite](https://vitejs.dev) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide React](https://lucide.dev) for the beautiful icons
- [React](https://reactjs.org) for the amazing frontend framework

## 📞 Support

If you have any questions or need help:

- **Issues:** [GitHub Issues](https://github.com/yourusername/newshub/issues)
- **Email:** your-email@example.com
- **Twitter:** [@yourusername](https://twitter.com/yourusername)

---

**Made with ❤️ by the NewsHub Team**

*Stay informed, stay connected! 📰*
