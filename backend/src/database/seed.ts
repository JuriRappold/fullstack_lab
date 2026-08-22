import { connection, ProjectModel, UpdateModel, UserModel} from "./schema.js";
import {
    hashPassword,
} from '../middleware/hashPassword.js';

async function seed() {
    try {
        await UpdateModel.deleteMany({});
        await ProjectModel.deleteMany({});
        await UserModel.deleteMany({});

        // 1. Create 10 users (username max 50 chars, password max 50 chars)
        const userData = [
            { username: "alice", password: await hashPassword("alice-password") },
            { username: "bob", password: await hashPassword("bob-password") },
            { username: "charlie", password: await hashPassword("charlie-password") },
            { username: "diana", password: await hashPassword("diana-password") },
            { username: "eve", password: await hashPassword("eve-password") },
            { username: "frank", password: await hashPassword("frank-password") },
            { username: "grace", password: await hashPassword("grace-password") },
            { username: "henry", password: await hashPassword("henry-password") },
            { username: "ivy", password: await hashPassword("ivy-password") },
            { username: "jack", password: await hashPassword("jack-password") },
        ];

        const users = await UserModel.insertMany(userData);
        const [alice, bob, charlie, diana, eve, frank, grace, henry, ivy, jack] = users;

        // 2. Each user owns 5 projects (50 projects total)
        // All titles are <= 50 chars, descriptions <= 500 chars
        const projectTitles = [
            // Alice's projects
            { title: "E-commerce Platform", description: "A full-featured online store with payment integration and inventory management system.", status: "WIP", owner: alice, contributors: [bob, charlie] },
            { title: "Task Manager", description: "A web application for managing personal and team tasks with real-time collaboration features.", status: "WIP", owner: alice, contributors: [diana, eve] },
            { title: "Social Media Dashboard", description: "Aggregates social media metrics and analytics from multiple platforms in one view.", status: "DESIGN", owner: alice, contributors: [frank, grace] },
            { title: "Portfolio Generator", description: "Automated portfolio website builder for creatives with customizable templates.", status: "IDEA", owner: alice, contributors: [henry] },
            { title: "Data Visualization Tool", description: "Interactive charts and graphs for data analysis with export capabilities.", status: "FINISHED", owner: alice, contributors: [bob, ivy] },

            // Bob's projects
            { title: "Weather Dashboard", description: "A dashboard displaying current and forecasted weather data with interactive maps.", status: "DESIGN", owner: bob, contributors: [alice, diana] },
            { title: "Chat Application", description: "Real-time messaging with end-to-end encryption and file sharing capabilities.", status: "WIP", owner: bob, contributors: [charlie, eve] },
            { title: "Inventory Management", description: "Track and manage warehouse inventory in real-time with barcode scanning.", status: "FINISHED", owner: bob, contributors: [frank, grace] },
            { title: "Music Streaming Service", description: "A platform for streaming and discovering new music with personalized playlists.", status: "IDEA", owner: bob, contributors: [alice, henry] },
            { title: "Budget Tracker", description: "Personal finance management with expense categorization and budget planning tools.", status: "DESIGN", owner: bob, contributors: [ivy, jack] },

            // Charlie's projects
            { title: "Recipe Platform", description: "A community platform for sharing and discovering recipes with ratings and reviews.", status: "IDEA", owner: charlie, contributors: [diana, eve] },
            { title: "Learning Management System", description: "Platform for online courses and educational content with progress tracking.", status: "WIP", owner: charlie, contributors: [alice, frank] },
            { title: "Event Planner", description: "Organize and manage events with guest invitations and scheduling features.", status: "DESIGN", owner: charlie, contributors: [bob, grace] },
            { title: "Habit Tracker", description: "Build and maintain healthy habits with daily tracking and motivational reminders.", status: "FINISHED", owner: charlie, contributors: [henry, ivy] },
            { title: "Project Management Tool", description: "Kanban boards and sprint planning for agile teams with time tracking.", status: "WIP", owner: charlie, contributors: [alice, jack] },

            // Diana's projects
            { title: "Fitness Tracker", description: "An application for tracking workouts and fitness goals with progress analytics.", status: "FINISHED", owner: diana, contributors: [alice, eve] },
            { title: "E-book Reader", description: "Mobile-friendly e-book reader with annotations and bookmarking features.", status: "DESIGN", owner: diana, contributors: [bob, frank] },
            { title: "Pet Care App", description: "Track pet health, appointments, and care routines with veterinary integration.", status: "WIP", owner: diana, contributors: [charlie, grace] },
            { title: "Job Search Platform", description: "Aggregate job listings with application tracking and resume management.", status: "IDEA", owner: diana, contributors: [henry, ivy] },
            { title: "Transportation Scheduler", description: "Plan and manage public transit and ride-sharing with real-time updates.", status: "ARCHIVED", owner: diana, contributors: [bob, jack] },

            // Eve's projects
            { title: "Study Planner", description: "A tool for organizing courses and study sessions with calendar integration.", status: "ARCHIVED", owner: eve, contributors: [bob, charlie] },
            { title: "Budget Planner", description: "Monthly budget planning with goal tracking and spending insights.", status: "FINISHED", owner: eve, contributors: [alice, diana] },
            { title: "Collaborative Whiteboard", description: "Real-time collaborative drawing and note-taking for team brainstorming.", status: "WIP", owner: eve, contributors: [frank, grace] },
            { title: "News Aggregator", description: "Curate and organize news from multiple sources with personalized feed.", status: "DESIGN", owner: eve, contributors: [alice, henry] },
            { title: "Survey Builder", description: "Create and distribute surveys with analytics dashboard and export options.", status: "IDEA", owner: eve, contributors: [ivy, jack] },

            // Frank's projects
            { title: "Photo Gallery", description: "Cloud-based photo storage and sharing platform with albums and editing tools.", status: "WIP", owner: frank, contributors: [alice, bob] },
            { title: "Password Manager", description: "Secure password storage with multi-factor authentication and auto-fill.", status: "DESIGN", owner: frank, contributors: [charlie, diana] },
            { title: "Task Automation", description: "Automate repetitive tasks with custom workflows and trigger-based actions.", status: "FINISHED", owner: frank, contributors: [eve, grace] },
            { title: "Customer Support System", description: "Ticket management and support team collaboration with knowledge base.", status: "WIP", owner: frank, contributors: [henry, ivy] },
            { title: "Language Learning App", description: "Interactive language lessons with progress tracking and gamification.", status: "IDEA", owner: frank, contributors: [alice, jack] },

            // Grace's projects
            { title: "Holiday Planner", description: "Plan and organize holiday trips and itineraries with budget management.", status: "DESIGN", owner: grace, contributors: [bob, charlie] },
            { title: "Mood Journal", description: "Daily mood tracking with journaling capabilities and emotional insights.", status: "FINISHED", owner: grace, contributors: [diana, eve] },
            { title: "Freelance Marketplace", description: "Connect freelancers with project opportunities and secure payments.", status: "WIP", owner: grace, contributors: [frank, henry] },
            { title: "Cooking Assistant", description: "Step-by-step cooking guidance with timers and ingredient substitutions.", status: "IDEA", owner: grace, contributors: [alice, ivy] },
            { title: "Volunteer Network", description: "Connect volunteers with community service opportunities and track hours.", status: "DESIGN", owner: grace, contributors: [bob, jack] },

            // Henry's projects
            { title: "Housing Finder", description: "Search and compare housing options with filters for price, location, and amenities.", status: "WIP", owner: henry, contributors: [charlie, diana] },
            { title: "Book Club Manager", description: "Organize book club meetings and reading lists with discussion guides.", status: "FINISHED", owner: henry, contributors: [eve, frank] },
            { title: "Parking Locator", description: "Find available parking spots in urban areas with real-time availability.", status: "DESIGN", owner: henry, contributors: [grace, ivy] },
            { title: "Study Group Platform", description: "Connect students for collaborative studying with shared resources.", status: "IDEA", owner: henry, contributors: [alice, jack] },
            { title: "Sports League Manager", description: "Manage teams, schedules, and scores for sports leagues with statistics.", status: "WIP", owner: henry, contributors: [bob, charlie] },

            // Ivy's projects
            { title: "Meditation App", description: "Guided meditation sessions with progress tracking and mindfulness exercises.", status: "DESIGN", owner: ivy, contributors: [diana, eve] },
            { title: "Grocery List Helper", description: "Smart grocery list with meal planning integration and recipe suggestions.", status: "FINISHED", owner: ivy, contributors: [frank, grace] },
            { title: "Car Maintenance Tracker", description: "Track vehicle service history and maintenance reminders with cost tracking.", status: "WIP", owner: ivy, contributors: [alice, henry] },
            { title: "Mentorship Platform", description: "Connect mentors with mentees for professional development and career growth.", status: "IDEA", owner: ivy, contributors: [bob, jack] },
            { title: "Feedback Collection Tool", description: "Gather and analyze customer feedback and surveys with sentiment analysis.", status: "DESIGN", owner: ivy, contributors: [charlie, diana] },

            // Jack's projects
            { title: "Order Management System", description: "Process and track customer orders and shipments with delivery management.", status: "WIP", owner: jack, contributors: [eve, frank] },
            { title: "Rental Property Manager", description: "Manage rental properties and tenant communications with payment tracking.", status: "FINISHED", owner: jack, contributors: [grace, henry] },
            { title: "Digital Art Gallery", description: "Showcase and sell digital art creations with artist profiles and auctions.", status: "DESIGN", owner: jack, contributors: [alice, bob] },
            { title: "Group Booking Tool", description: "Coordinate group activities and event bookings with expense splitting.", status: "IDEA", owner: jack, contributors: [charlie, diana] },
            { title: "Invoicing Software", description: "Create and send professional invoices to clients with payment reminders.", status: "WIP", owner: jack, contributors: [eve, ivy] },
        ];

        const projectDocs = await ProjectModel.insertMany(
            projectTitles.map(p => ({
                title: p.title,
                description: p.description,
                status: p.status,
                owner_id: p.owner._id,
                contributors: p.contributors.map(c => c._id),
            }))
        );

        // 3. Each user has minimum 10 updates (100 updates total)
        // All update titles <= 50 chars, descriptions <= 500 chars
        const updateTitles = [
            { title: "Initial Project Setup", description: "Created project repository and initial configuration with basic structure." },
            { title: "Database Schema Designed", description: "Completed the MongoDB schema design and relationships between collections." },
            { title: "UI/UX Mockups Created", description: "Designed wireframes and interactive prototypes for key user interfaces." },
            { title: "API Endpoints Defined", description: "RESTful API design with OpenAPI specification and documentation." },
            { title: "Authentication Implemented", description: "Added JWT-based authentication and authorization with refresh tokens." },
            { title: "Frontend Scaffolding", description: "Set up the React/Vue.js project structure with component library." },
            { title: "Backend Integration", description: "Connected frontend to backend API services with error handling." },
            { title: "Testing Suite Added", description: "Implemented unit and integration tests with coverage reporting." },
            { title: "Deployment Pipeline", description: "Configured CI/CD pipeline for automated deployment to production." },
            { title: "Performance Optimization", description: "Improved load times and optimized database queries with indexing." },
            { title: "Security Audit", description: "Performed security vulnerability assessment and fixed identified issues." },
            { title: "User Feedback Implemented", description: "Added feedback mechanisms and user suggestions tracking system." },
            { title: "Analytics Dashboard", description: "Integrated usage analytics and reporting with visual dashboards." },
            { title: "Bug Fixes and Improvements", description: "Fixed critical bugs and improved overall performance and stability." },
            { title: "Documentation Updated", description: "Updated API and user documentation with examples and tutorials." },
            { title: "Mobile Responsiveness", description: "Ensured mobile-friendly design and functionality across all devices." },
            { title: "Accessibility Improvements", description: "Added accessibility features for all users including screen readers." },
            { title: "Internationalization", description: "Added multi-language support with translation management system." },
            { title: "Data Backup System", description: "Implemented automated data backup and recovery procedures." },
            { title: "User Onboarding Flow", description: "Created smooth onboarding experience for new users with tutorials." },
            { title: "Payment Integration", description: "Integrated payment processing and billing with multiple gateways." },
            { title: "Notification System", description: "Added email and in-app notification system with preferences." },
            { title: "Search Functionality", description: "Implemented advanced search with filters and fuzzy matching." },
            { title: "Social Media Integration", description: "Added social login and sharing features for user engagement." },
            { title: "File Upload System", description: "Added file upload and management with cloud storage integration." },
        ];

        // Helper function to get random items
        const getRandomItems = (arr, count) => {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        // Helper function to pick a random element
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // Generate updates for each user
        const allUpdates = [];
        const allProjects = projectDocs;

        allProjects.forEach(project => {
            // Generate updates from multiple contributors for each project
            const projectContributors = project.contributors;
            const updatesCount = 3 + Math.floor(Math.random() * 5); // 3-8 updates per project

            for (let i = 0; i < updatesCount; i++) {
                const contributor = getRandomElement(projectContributors);
                const userObj = users.find(u => u._id.toString() === contributor.toString());
                if (!userObj) continue;

                const updateTitle = getRandomElement(updateTitles);
                const projectTitle = project.title.length > 20 ? project.title.substring(0, 20) : project.title;
                const titleStr = `${updateTitle.title} ${projectTitle}`;
                allUpdates.push({
                    title: titleStr.length > 50 ? titleStr.substring(0, 47) + "..." : titleStr,
                    description: `Update for ${project.title}: ${updateTitle.description}`.substring(0, 500),
                    project_id: project._id,
                    contributor_id: contributor,
                });
            }
        });

        // Ensure each user has at least 10 updates
        users.forEach(user => {
            const userUpdateCount = allUpdates.filter(u => u.contributor_id.toString() === user._id.toString()).length;
            if (userUpdateCount < 10) {
                const projectsWithUser = allProjects.filter(p =>
                    p.contributors.some(c => c.toString() === user._id.toString()) ||
                    p.owner_id.toString() === user._id.toString()
                );
                if (projectsWithUser.length === 0) {
                    // If user has no projects, add updates to random projects
                    const randomProjects = getRandomItems(allProjects, 5);
                    for (let i = 0; i < 10 - userUpdateCount; i++) {
                        const project = getRandomElement(randomProjects);
                        const updateTitle = getRandomElement(updateTitles);
                        const projectTitle = project.title.length > 20 ? project.title.substring(0, 20) : project.title;
                        const titleStr = `${updateTitle.title} ${projectTitle}`;
                        allUpdates.push({
                            title: titleStr.length > 50 ? titleStr.substring(0, 47) + "..." : titleStr,
                            description: `Additional update for ${project.title}: ${updateTitle.description}`.substring(0, 500),
                            project_id: project._id,
                            contributor_id: user._id,
                        });
                        // Add user as contributor to the project if not already
                        if (!project.contributors.some(c => c.toString() === user._id.toString())) {
                            project.contributors.push(user._id);
                        }
                    }
                } else {
                    for (let i = 0; i < 10 - userUpdateCount; i++) {
                        const project = getRandomElement(projectsWithUser);
                        const updateTitle = getRandomElement(updateTitles);
                        const projectTitle = project.title.length > 20 ? project.title.substring(0, 20) : project.title;
                        const titleStr = `${updateTitle.title} ${projectTitle}`;
                        allUpdates.push({
                            title: titleStr.length > 50 ? titleStr.substring(0, 47) + "..." : titleStr,
                            description: `Additional update for ${project.title}: ${updateTitle.description}`.substring(0, 500),
                            project_id: project._id,
                            contributor_id: user._id,
                        });
                    }
                }
            }
        });

        // Ensure each user has at least 10 updates by adding more if needed
        users.forEach(user => {
            const finalUserUpdateCount = allUpdates.filter(u => u.contributor_id.toString() === user._id.toString()).length;
            if (finalUserUpdateCount < 10) {
                const randomProjects = getRandomItems(allProjects, Math.min(allProjects.length, 5));
                for (let i = 0; i < 10 - finalUserUpdateCount; i++) {
                    const project = getRandomElement(randomProjects);
                    const updateTitle = getRandomElement(updateTitles);
                    const projectTitle = project.title.length > 20 ? project.title.substring(0, 20) : project.title;
                    const titleStr = `${updateTitle.title} ${projectTitle}`;
                    allUpdates.push({
                        title: titleStr.length > 50 ? titleStr.substring(0, 47) + "..." : titleStr,
                        description: `Final update for ${project.title}: ${updateTitle.description}`.substring(0, 500),
                        project_id: project._id,
                        contributor_id: user._id,
                    });
                    if (!project.contributors.some(c => c.toString() === user._id.toString())) {
                        project.contributors.push(user._id);
                    }
                }
            }
        });

        // Insert all updates
        await UpdateModel.insertMany(allUpdates);

        // Update projects with new contributors
        await Promise.all(allProjects.map(p => p.save()));

        console.log("Seed completed successfully");
        console.log(`Created ${users.length} users`);
        console.log(`Created ${allProjects.length} projects`);
        console.log(`Created ${allUpdates.length} updates`);
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await connection.close();
        console.log("DONE");
    }
}

await seed();