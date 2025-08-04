# 🎵 Audio Learning Game

An interactive React-based educational game that helps users learn number recognition and basic math through audio cues. Perfect for auditory learners, children, or anyone looking to improve their mental math skills in a fun way!

## ✨ Features

### 🔢 Number Recognition Game
- **Audio-based learning**: Each number (0-9) has a unique sound frequency
- **Interactive gameplay**: Listen to a number and click the correct button
- **Immediate feedback**: Visual and audio confirmation for correct/incorrect answers

### ➕ Math Challenge Game
- **Addition practice**: Solve simple addition problems (0-9 + 0-9)
- **Audio problems**: Listen to two numbers being played sequentially
- **Multi-digit answers**: Build answers by clicking individual digits
- **Progressive difficulty**: Random number generation keeps it challenging

### 📊 Progress Tracking
- **Score system**: Track your correct answers
- **Streak counter**: See how many you can get right in a row
- **Real-time feedback**: Instant visual and audio responses

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/audio-learning-game.git
   cd audio-learning-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to play the game!

## 🎮 How to Play

### Number Game Mode
1. Click **"🔢 Number Game"** to select this mode
2. Press **"🎵 Play Sound"** to hear a random number
3. Click the corresponding number button (0-9)
4. Get instant feedback and see your score increase!

### Math Game Mode
1. Click **"➕ Math Game"** to select this mode
2. Press **"🎵 New Problem"** to hear two numbers
3. Add them together mentally
4. Click the digit buttons to build your answer (e.g., click "1" then "8" for 18)
5. Press **"✓ Submit"** to check your answer
6. Use **"🗑️ Clear"** to reset if you make a mistake

## 🔧 Technical Details

### Audio System
The game uses the **Web Audio API** to generate unique sound frequencies for each number:
- Numbers 0-9 are mapped to frequencies from 200-650 Hz
- Each number has a distinct tone for easy recognition
- Success sounds use pleasant ascending chords
- Error sounds use descending tones

### Architecture
- **React Hooks**: Modern functional components with useState for state management
- **Component Structure**: Clean, modular code with separated concerns
- **CSS Architecture**: Organized stylesheets with responsive design
- **Cross-browser Compatibility**: Works with modern browsers supporting Web Audio API

## 🎨 Customization

### Changing Colors
Edit the gradient in `App.css`:
```css
.app-container {
  background: linear-gradient(135deg, #your-color1, #your-color2, #your-color3);
}
```

### Modifying Audio
Update the frequency arrays in the component:
```javascript
const frequencies = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650]
```

### Adding Audio Files
To use custom audio files instead of generated tones:
1. Place audio files in a `public/sounds/` directory
2. Replace the `playNumberSound` function with audio file playback
3. Update the import statements

## 📱 Browser Support

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 13.4+)
- **Edge**: Full support

*Note: Web Audio API requires user interaction to start on most browsers for security reasons.*

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Bug Reports**: Found a bug? Open an issue with details
2. **Feature Requests**: Have an idea? We'd love to hear it
3. **Code Contributions**: 
   - Fork the repository
   - Create a feature branch (`git checkout -b feature/amazing-feature`)
   - Commit your changes (`git commit -m 'Add amazing feature'`)
   - Push to the branch (`git push origin feature/amazing-feature`)
   - Open a Pull Request

### Development Guidelines
- Follow React best practices
- Maintain responsive design principles
- Test on multiple browsers
- Keep accessibility in mind
- Write clear commit messages

## 📋 Roadmap

- [ ] **Subtraction/Multiplication modes**
- [ ] **Difficulty levels** (larger numbers, more complex operations)
- [ ] **User profiles** and progress saving
- [ ] **Leaderboards** and achievements
- [ ] **Sound customization** options
- [ ] **Offline PWA** support
- [ ] **Multi-language** support

## 🙏 Acknowledgments

- **Web Audio API** for making browser-based audio generation possible
- **React community** for the amazing ecosystem
- **Modern CSS** techniques for the beautiful UI design
- **Educational gaming** principles for effective learning design

---

**Made with ❤️ for auditory learners everywhere!**

*Star ⭐ this repository if you found it helpful!*
