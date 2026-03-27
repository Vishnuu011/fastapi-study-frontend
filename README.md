# Blog Frontend

A modern, responsive blog application built with **React**, **Vite**, **Tailwind CSS**, and **React Router**. Create, read, update, and delete blog posts with user authentication.

## Features

- ✨ **Modern UI** - Built with Tailwind CSS for a clean, responsive design
- 🔐 **User Authentication** - Register, login, and secure token management
- 📝 **CRUD Operations** - Create, read, update, and delete blog posts
- 🎯 **Fast Performance** - Vite for rapid development and optimized builds
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🔗 **Routing** - React Router for smooth navigation
- 🛡️ **Protected Routes** - Authenticated access to dashboard

## Tech Stack

- **React 18** - UI library
- **Vite 8** - Build tool & dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **PostCSS & Autoprefixer** - CSS processing

## Project Structure

```
src/
├── api/
│   └── axiosClient.js          # Axios configuration & API calls
├── components/
│   ├── BlogCard.jsx            # Blog post card component
│   ├── BlogForm.jsx            # Create/edit blog form
│   ├── Navbar.jsx              # Navigation bar
│   └── Pagination.jsx          # Pagination component
├── context/
│   └── AuthContext.jsx         # Authentication state management
├── pages/
│   ├── Home.jsx                # Homepage with blog list
│   ├── BlogDetail.jsx          # Individual blog post view
│   ├── Dashboard.jsx           # User dashboard
│   ├── Login.jsx               # Login page
│   └── Register.jsx            # Registration page
├── routes/
│   └── ProtectedRoute.jsx      # Protected route wrapper
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd blog-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment (optional)**
   Create `.env.local` to override the API URL:

```
VITE_API_URL=https://your-api-url.com
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Output will be in the `dist/` folder.

## Preview Production Build

Test the production build locally:

```bash
npm run preview
```

## API Integration

The frontend connects to a FastAPI backend at:

```
https://fastapi-study-ozgc.onrender.com
```

### Available Endpoints

- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/blogs/blogs` - Get blogs (paginated)
- `POST /api/v1/blogs/blogs` - Create blog (authenticated)
- `PUT /api/v1/blogs/blogs/:id` - Update blog (authenticated)
- `DELETE /api/v1/blogs/blogs/:id` - Delete blog (authenticated)

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
# Follow the prompts, then deploy to production:
vercel --prod
```

### Deploy to Netlify

1. **Build the project**

```bash
npm run build
```

2. **Use Netlify CLI**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect your GitHub repo to Netlify dashboard for automatic deployments.

### Environment Variables for Production

Set the following in your deployment platform:

```
VITE_API_URL=<your-production-api-url>
```

## Features in Detail

### Authentication

- User registration with email and password
- JWT token-based authentication
- Tokens stored in localStorage
- Automatic logout on 401 response

### Dashboard

- View all user's blog posts
- Create new blog posts
- Edit existing posts
- Delete posts with confirmation

### Blog List

- Paginated blog display
- Read time estimation
- Blog previews with metadata
- Click to read full post

### Blog Detail

- Full blog post view
- Author information (email)
- Date and read time
- Update metadata if edited

## Keyboard Shortcuts & Navigation

- `/` - Go to home page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (authenticated)
- `/blog/:id` - View individual blog post

## State Management

The app uses React Context API for authentication state management:

- `AuthContext` - Manages user login/logout and token persistence

## Styling

Uses Tailwind CSS with custom utility classes for:

- Consistent color palette
- Typography system
- Responsive breakpoints
- Animation effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Future Enhancements

- [ ] Search functionality
- [ ] Blog categories/tags
- [ ] Comments system
- [ ] Like/bookmark posts
- [ ] Dark mode
- [ ] Social sharing
- [ ] SEO optimization
- [ ] Analytics integration

---

**Happy blogging! 🚀**
