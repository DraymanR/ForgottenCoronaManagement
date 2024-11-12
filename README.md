
# HMO Corona Database Management System

![Member List](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/homePage.JPG)
## Overview

This FullStack system is designed for managing the Corona database of a large health fund. It provides functionalities to display health insurance members, edit and delete them, and manage their records in a database. Additionally, the system maintains central information about the Corona epidemic concerning the members in the medical clinic.

### Features

- **Member List View**: Displays all members in the HMO.
- **Member Detail View**: Shows personal details and Corona information for a selected member.
- **CRUD Operations**: Supports creating, reading, updating, and deleting member records.
- **Input Validation**: Ensures the correctness of inputs to prevent errors.
- **Security**: Requires login with a system password to ensure privacy and security (uses JWT authentication).

## How to Use

### Login with system password

![Login](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/Login.JPG)

First, in order to ensure the privacy of HMO members and security, you must log in to the system with a system password.
### Viewing Members

![Member List](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/MemberList.JPG)

1. **Member List**: Navigate to the main page to see a list of all health fund members.
2. **Member Details**: Click on a member to view their personal details and Corona information.

### Adding Members

![Add Member](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/AddMember.JPG)

1. Click on the "Add Member" button.
2. Fill in the member's details in the form and submit.
3. 
### Editing Member's Corona Data

![Update Member's Corona Data](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/UpdateCoronaData.JPG)

1. Click on the button "Edit corona data for a member".
2. Insert member ID.
2. Change the details in the attached form and send.

### Checking how many active patients there were each day in the last month - Bonus
![Add Member](https://github.com/pessiMargalit/hmo-corona-management/blob/main/Screenshots/Chart.JPG)

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB
- React

### Setting Up the Server

1. Clone the repository:
   ```
   git clone https://github.com/pessiMargalit/hmo-corona-management.git
   ```
2. Navigate to the server directory:
   ```
   cd path/to/server
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```

### Setting Up the Client

1. Navigate to the client directory:
   ```
   cd path/to/client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the client:
   ```
   npm start
   ```

## Simplistic Assumptions

- **Data Validation**: While basic input validation is performed, comprehensive data validation and sanitation might be required based on real-world usage.
- **Error Handling**: Basic error handling is implemented. A more detailed approach might be necessary for a production environment.

## External Dependencies

- **React**: Used for building the client-side interface.
- **Node.js/Express**: Powers the server-side logic.
- **MongoDB**: Database for storing member and Corona records.
- **Mongoose**: MongoDB object modeling for Node.js.

To install these dependencies, refer to the "Setting Up the Server" and "Setting Up the Client" sections.

## Contributing

We welcome contributions to this project.
