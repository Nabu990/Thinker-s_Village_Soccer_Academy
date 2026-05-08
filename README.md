# Thinker's Village Soccer Academy (TVSA)

A comprehensive youth soccer academy management system built with Next.js, TypeScript, and modern web technologies. This platform serves as the digital hub for Thinker's Village Soccer Academy in Paynesville, Liberia, providing complete management capabilities for players, coaches, and fans.

## 🏆 Features

### 🏠 Public Website
- **Modern Responsive Design** with Tailwind CSS
- **Interactive 3D Elements** using Three.js
- **Public Gallery** with photo management
- **About & Contact Pages** with academy information
- **User Registration** for different roles

### 👤 Role-Based Dashboards

#### Manager Dashboard
- **Player Management**: Full CRUD operations for player profiles
- **Coach Management**: Complete coaching staff administration
- **Gallery Management**: Photo upload and organization
- **Tournament Management**: Match scheduling and results
- **Training Session Planning**: Schedule and track training

#### Player Dashboard
- **Personal Profile**: View and update personal information
- **Skills Assessment**: Track skill development progress
- **Training Schedule**: View upcoming training sessions
- **Match Calendar**: See scheduled matches and events
- **Achievements**: Display personal accomplishments

#### Fan Dashboard
- **Team Information**: View player profiles and team stats
- **Match Schedule**: Follow upcoming games
- **Photo Gallery**: Browse academy photos
- **News & Updates**: Stay informed about academy news

### 🛠 Technical Features
- **Authentication System**: JWT-based secure authentication
- **Role-Based Access Control**: Manager, Player, and Fan roles
- **Database Integration**: MongoDB with Mongoose ODM
- **Image Upload**: Cloudinary integration for photo storage
- **API Routes**: RESTful API for all operations
- **Responsive Design**: Mobile-first approach
- **Modern UI Components**: Custom reusable components

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations and transitions
- **Three.js** - 3D graphics and animations
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 5.0+
- npm or yarn package manager

## 🛠 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Thinker-s_Village_Soccer_Academy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your .env file**
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tvs-academy

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary (optional for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Application
NODE_ENV=development
PORT=3000
```

5. **Start MongoDB**
```bash
# For local MongoDB installation
mongod

# Or using Docker
docker run -d -p 27017:27017 mongo
```

6. **Run the development server**
```bash
npm run dev
```

7. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Getting Started

1. **Register as a Manager**
   - Go to `/auth/register`
   - Select "Manager" role
   - Fill in your information

2. **Add Players**
   - Login as Manager
   - Navigate to Dashboard → Players → Add Player
   - Create player profiles

3. **Add Coaches**
   - Navigate to Dashboard → Coaches → Add Coach
   - Set up coaching staff

4. **Upload Photos**
   - Navigate to Dashboard → Gallery → Add Photos
   - Upload training, match, and event photos

### User Roles

#### Manager
- Full access to all academy management features
- Can create, edit, and delete players and coaches
- Manages gallery and content
- Schedules training and matches

#### Player
- View personal profile and statistics
- See training schedule and match calendar
- Track skill development progress
- View achievements

#### Fan
- Browse team information and player profiles
- View match schedules and results
- Access photo gallery
- Stay updated with academy news

## 🏗 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── gallery/           # Public gallery
│   └── (public pages)     # About, Contact, etc.
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── models/           # Database models
│   └── auth.ts           # Authentication logic
└── public/               # Static assets
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Models

The application uses the following main models:

- **User**: Basic user information and authentication
- **Player**: Extended player profile with skills and stats
- **Coach**: Coach profiles with specializations
- **Gallery**: Photo and media management

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Players
- `GET /api/players` - List all players
- `POST /api/players` - Create new player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

#### Coaches
- `GET /api/coaches` - List all coaches
- `POST /api/coaches` - Create new coach
- `PUT /api/coaches/:id` - Update coach
- `DELETE /api/coaches/:id` - Delete coach

#### Gallery
- `GET /api/gallery` - List gallery items
- `POST /api/gallery` - Upload new item
- `PUT /api/gallery/:id` - Update item
- `DELETE /api/gallery/:id` - Delete item

## 🌟 Key Features Explained

### 3D Interactive Elements
The homepage features an interactive 3D football field created with Three.js, providing an engaging visual experience that showcases the academy's modern approach.

### Comprehensive Player Management
Managers can maintain detailed player profiles including:
- Personal information and contact details
- Skills assessment (speed, shooting, passing, etc.)
- Medical information and emergency contacts
- Team assignments and jersey numbers
- Achievement tracking

### Advanced Gallery System
- Categorized photo organization
- Featured image management
- Like and view tracking
- Responsive grid and list views
- Full-screen image viewing

### Role-Based Security
Secure authentication system with role-based access control ensures that users only see the features and data appropriate to their role.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Thinker's Village Soccer Academy  
Location: Thinker's Village, Paynesville, Liberia  
Email: info@tvsacademy.org  
Phone: +231-XXX-XXXX-XXX

## 🙏 Acknowledgments

- The Thinker's Village community for their support
- All the young players who inspire us daily
- The coaching staff dedicated to youth development
- The fans who support our academy

---

**Built with ❤️ for the young soccer stars of Liberia** 
