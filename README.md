# Tour de Linux

An interactive web application built with Vue.js that provides a comprehensive tour through the world of Linux, covering distributions, features, news, and more - all through an immersive terminal-like interface.

## Project Overview

Tour de Linux is designed to be your guide to the Linux ecosystem, presented through an authentic terminal-like experience. The application simulates a Linux terminal environment, allowing users to learn by doing in a familiar command-line interface. Whether you're a beginner looking to understand Linux basics or an experienced user wanting to explore new distributions and features, this application provides structured information, comparisons, and the latest news from the Linux world - all accessible through commands and terminal interactions.

## Features

- **Terminal-Like Interface**: Navigate the entire application using commands and a CLI experience
- **Interactive Shell**: Real command processing with feedback and responses
- **Distribution Explorer**: Compare and learn about different Linux distributions through terminal commands
- **Command Library**: Interactive guide to essential Linux commands with real-time execution
- **Desktop Environments**: Visual tours of various Linux desktop environments launched through terminal commands
- **Package Management**: Interactive tutorials on different package managers (apt, dnf, pacman, etc.)
- **Latest News**: Updates on new releases and features in the Linux ecosystem, accessible via news feed commands
- **Terminal Themes**: Customize your terminal experience with different color schemes and fonts
- **Command History**: Navigate through previously executed commands
- **Tab Completion**: Experience authentic command completion functionality
- **Installation Guides**: Step-by-step instructions for installing popular distributions

## Technology Stack

- Vue.js 3
- TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- SASS for styling

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tourdelinux.git
   cd tourdelinux
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Docker Setup

### Production Setup

#### Using Docker Compose (Recommended)

1. Build and start the production container:
   ```bash
   docker compose up -d app
   ```

2. Access the application at http://localhost:8080

#### Using Docker Directly

1. Build the production Docker image:
   ```bash
   docker build -t tourdelinux .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 tourdelinux
   ```

3. Access the application at http://localhost:8080

### Development Setup with Hot-Reloading

#### Using Docker Compose

1. Start the development container with hot-reloading:
   ```bash
   docker compose --profile dev up dev
   ```

2. Access the development server at http://localhost:5173

3. Any changes you make to the source files will be automatically reflected in the browser.

#### Using Docker Directly

1. Build the development Docker image:
   ```bash
   docker build -t tourdelinux-dev -f Dockerfile.dev .
   ```

2. Run the development container:
   ```bash
   docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules tourdelinux-dev
   ```

3. Access the development server at http://localhost:5173

## Project Structure

```
tourdelinux/
├── src/                  # Source files
│   ├── assets/           # Static assets
│   ├── components/       # Vue components
│   ├── router/           # Vue Router configuration
│   ├── types/            # TypeScript type definitions
│   ├── views/            # Vue views/pages
│   ├── factories/        # Factory functions
│   ├── App.vue           # Main Vue component
│   └── main.ts           # Application entry point
├── public/               # Public static assets
├── architecture/         # Architecture documentation
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Terminal-Like Interface

Tour de Linux features a unique terminal-like interface that simulates the Linux command-line experience:

### Key Interface Features
- **Command Prompt**: Authentic bash-like prompt with username, hostname, and current directory
- **Command Execution**: Type real Linux commands to navigate the application
- **Command Output**: Styled terminal output with appropriate formatting and colors
- **Man Pages**: Access detailed help for both real Linux commands and application-specific commands
- **File System Navigation**: Navigate through a virtual file system using cd, ls, cat, etc.
- **Pipes and Redirects**: Support for command chaining and output redirection
- **Aliases**: Create custom command shortcuts
- **Environment Variables**: Set and use variables within your terminal session
- **Terminal Shortcuts**: Support for keyboard shortcuts like Ctrl+C, Ctrl+L, etc.

## Content Categories (in progress)

All content is accessible through the terminal interface and organized into several key categories:

### Distributions
- Popular distributions (Ubuntu, Fedora, Arch, Debian, etc.)
- Specialized distributions (Kali, Tails, Clear Linux, etc.)
- Comparison tools and recommendations based on user needs
- Access via commands like `distro-info ubuntu` or `compare-distros ubuntu fedora`

### System Components
- Kernel features and versions
- Init systems (systemd, OpenRC, etc.)
- File systems and disk management
- Access via commands like `kernel-info` or `explain systemd`

### Desktop Environments
- GNOME, KDE Plasma, Xfce, Cinnamon, etc.
- Window managers
- Customization options
- Access via commands like `show-de gnome` or `compare-de kde xfce`

### Package Management
- APT, DNF, Pacman, Flatpak, Snap, AppImage
- Package repositories
- Dependency management
- Access via commands like `explain apt` or `package-tutorial pacman`

### Terminal & Commands 
- Basic to advanced command tutorials
- Shell options (Bash, Zsh, Fish)
- Terminal customization
- Access via commands like `learn ls` or `shell-compare bash zsh`

### Latest News
- Distribution releases
- Security updates
- New technologies in the Linux ecosystem
- Access via commands like `news` or `releases ubuntu`

## Development

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## Contributing

We welcome contributions to Tour de Linux! Here's how you can help:

1. **Terminal Interface Improvements**: Enhance the terminal-like experience with new features
2. **Command Implementations**: Add new commands or improve existing command functionality
3. **Content Contributions**: Add information about distributions, commands, or features
4. **Code Contributions**: Improve the application functionality or fix bugs
5. **Translation**: Help translate the content to other languages

### Terminal Interface Contribution Guidelines

When contributing to the terminal interface:

1. **Command Consistency**: Ensure new commands follow the same pattern and behavior as existing ones
2. **Terminal Output Styling**: Use the established styling system for terminal outputs
3. **Command Documentation**: Include proper "man page" documentation for any new commands
4. **Keyboard Shortcuts**: Maintain consistency with standard terminal shortcuts
5. **Performance**: Ensure command execution remains fast and responsive

### Content Contribution Guidelines

When adding new content:

1. **Command Access**: Ensure all new content is accessible through appropriate terminal commands
2. **Accuracy**: Verify all information is accurate and up-to-date
3. **Formatting**: Follow the established terminal output formatting for consistency

To contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

