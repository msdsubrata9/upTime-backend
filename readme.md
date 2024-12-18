# UpTime Backend

This is the backend for the UpTime application, which manages services, incidents, and statuses for the public status page.

## Features

- **User Authentication**: Secure login and authentication using Auth0.
- **Service Management**: CRUD operations for managing services and their statuses (e.g., Operational, Degraded Performance, Major Outage).
- **Incident Management**: Create, update, and resolve incidents or scheduled maintenance.
- **Real-time Status Updates**: Push status changes to connected clients via WebSocket.

## Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing service and incident data.
- **WebSocket**: Real-time communication for status updates.
- **Auth0**: User and team management (authentication).

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/msdsubrata9/upTime-backend.git
   ```
