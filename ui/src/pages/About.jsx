import React from "react";
import { Container } from "../components/Container/Container";

export const About = () => {
  return (
    <Container>
      <div className="about-info">
        <h1>About This Project</h1>

        <p>
          This application integrates well-known security tools such as{" "}
          <strong>Nmap</strong> and <strong>Subfinder</strong>, providing an
          intuitive interface to perform scans, monitor their progress in
          real-time, and visualize the results. It is designed to streamline and
          enhance the usability of these tools for users of varying skill
          levels. Below are some key features and technical highlights of the
          application:
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Nmap Integration:</strong>
            <ul>
              <li>
                Perform network discovery and scans using native commands or an
                intuitive "easy mode."
              </li>
              <li>Real-time scan progress updates and status tracking.</li>
              <li>
                View detailed scan results, including geolocation data for
                discovered IPs.
              </li>
              <li>Export scan results for offline analysis or reporting.</li>
              <li>Delete scans to maintain data hygiene.</li>
              <li>
                Visualize scan results on an interactive map, enabling
                geographical insights into the targets.
              </li>
            </ul>
          </li>
          <li>
            <strong>Subfinder Integration:</strong>
            <ul>
              <li>
                Similar to Nmap, Subfinder scans benefit from real-time updates,
                geolocation data, export options, and interactive map
                visualizations.
              </li>
              <li>
                The app supports seamless domain resolution to IP addresses
                using Node.js's <code>dns</code> library and integrates{" "}
                <strong>GeoIP Lite</strong> for geolocation, running entirely in
                memory for faster, synchronous lookups.
              </li>
            </ul>
          </li>
          <li>
            <strong>Overview and Analytics:</strong>
            <ul>
              <li>
                A dedicated overview page visualizes scan data through
                interactive charts, providing insights such as scan frequency,
                tool usage, and result summaries.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Authentication and Security</h2>
        <ul>
          <li>
            The application employs <strong>JWT tokens</strong> for user
            authentication, ensuring secure access to both the UI and backend
            API.
          </li>
          <li>
            All data requests are validated using tokens to enhance security and
            prevent unauthorized access.
          </li>
        </ul>

        <h2>Backend Architecture</h2>
        <ul>
          <li>
            Scans are executed on the backend using <strong>Docker</strong>,
            providing process isolation and enabling the app to handle multiple
            concurrent scans efficiently.
          </li>
          <li>
            This Dockerized approach ensures that the tools operate in secure,
            isolated environments without impacting the core application.
          </li>
        </ul>

        <h2>Real-Time Notifications</h2>
        <ul>
          <li>
            Efficient <strong>WebSocket system</strong> ensures users receive
            real-time updates about their scans. Users can subscribe to specific
            views to limit notifications to relevant pages, avoiding unnecessary
            updates or app-wide spamming.
          </li>
          <li>
            This path-based separation ensures efficient and targeted WebSocket
            communication for multiple user sessions.
          </li>
        </ul>

        <h2>Deployment and Infrastructure</h2>
        <ul>
          <li>
            The application is hosted on a <strong>DigitalOcean droplet</strong>{" "}
            (equivalent to AWS EC2), with the following setup:
            <ul>
              <li>
                <strong>Nginx</strong> serves the frontend built files.
              </li>
              <li>
                The backend server runs with <strong>PM2</strong> for efficient
                process management and automatic restarts.
              </li>
              <li>
                <strong>MongoDB</strong> handles scan data storage, running
                directly on the virtual machine for optimized performance.
              </li>
            </ul>
          </li>
          <li>
            <strong>Continuous Deployment</strong>:
            <ul>
              <li>
                The project uses <strong>GitHub Actions</strong> to automate
                deployment workflows. Upon pushing new changes to the
                repository, the CI/CD pipeline builds and deploys the latest
                version of the application to the droplet, ensuring minimal
                downtime and quick updates.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Future Enhancements</h2>
        <ul>
          <li>
            <strong>Additional Tools</strong>: The platform will integrate more
            security tools, such as Nikto, to broaden its capabilities.
          </li>
          <li>
            <strong>Enhanced Analytics</strong>: Plans include deeper insights
            into scan results, advanced filtering options, and customizable
            dashboards.
          </li>
          <li>
            <strong>Improved UI/UX</strong>: The interface will evolve to offer
            a more seamless experience with better accessibility and
            performance.
          </li>
        </ul>
      </div>
    </Container>
  );
};
