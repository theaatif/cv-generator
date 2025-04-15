import type { Project } from "@/types/resume"

/**
 * Fetches projects from GitHub
 * In a real implementation, this would use the GitHub API with authentication
 */
export async function fetchGitHubProjects(): Promise<Project[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Return mock data
  return [
    {
      title: "Personal Portfolio",
      description:
        "• Developed a responsive portfolio website using React and Tailwind CSS\n• Implemented dark mode and animations for enhanced user experience\n• Deployed using GitHub Pages with CI/CD pipeline",
      technologies: "React, Tailwind CSS, GitHub Actions",
      link: "https://github.com/username/portfolio",
      startDate: "01/2023",
      endDate: "03/2023",
    },
    {
      title: "E-commerce API",
      description:
        "• Built a RESTful API for an e-commerce platform using Node.js and Express\n• Implemented JWT authentication and role-based access control\n• Designed MongoDB schema with performance optimization",
      technologies: "Node.js, Express, MongoDB, JWT",
      link: "https://github.com/username/ecommerce-api",
      startDate: "05/2022",
      endDate: "08/2022",
    },
    {
      title: "Weather Dashboard",
      description:
        "• Created a weather dashboard that fetches data from OpenWeatherMap API\n• Implemented geolocation for automatic local weather detection\n• Added 5-day forecast with interactive charts using Chart.js",
      technologies: "JavaScript, HTML, CSS, Chart.js, API Integration",
      link: "https://github.com/username/weather-app",
      startDate: "11/2021",
      endDate: "12/2021",
    },
  ]
}

