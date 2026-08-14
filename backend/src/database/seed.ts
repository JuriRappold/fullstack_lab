import { connection, ProjectModel, UpdateModel, UserModel} from "./schema.js";
import {
    hashPassword,
} from '../middleware/hashPassword.js';

async function seed() {
    try {
        await UpdateModel.deleteMany({});
        await ProjectModel.deleteMany({});
        await UserModel.deleteMany({});
        const user = [
            { username: "alice", password: await hashPassword("alice-password") },
            { username: "bob", password: await hashPassword("bob-password") },
            { username: "charlie", password: await hashPassword("charlie-password") },
            { username: "diana", password: await hashPassword("diana-password") },
            { username: "eve", password: await hashPassword("eve-password") },
        ]

        const users = await UserModel.insertMany(user);

        const [alice, bob, charlie, diana, eve] = users;

        const projects = await ProjectModel.insertMany([
            {
                title: "Task Manager",
                description: "A web application for managing personal and team tasks.",
                status: "WIP",
                owner_id: alice._id,
                contributors: [bob._id, charlie._id],
            },
            {
                title: "Weather Dashboard",
                description: "A dashboard displaying current and forecasted weather data.",
                status: "DESIGN",
                owner_id: bob._id,
                contributors: [alice._id, diana._id],
            },
            {
                title: "Recipe Platform",
                description: "A community platform for sharing and discovering recipes.",
                status: "IDEA",
                owner_id: charlie._id,
                contributors: [diana._id, eve._id],
            },
            {
                title: "Fitness Tracker",
                description: "An application for tracking workouts and fitness goals.",
                status: "FINISHED",
                owner_id: diana._id,
                contributors: [alice._id, eve._id],
            },
            {
                title: "Study Planner",
                description: "A tool for organizing courses and study sessions.",
                status: "ARCHIVED",
                owner_id: eve._id,
                contributors: [bob._id, charlie._id],
            },
        ]);

        const [
            taskManager,
            weatherDashboard,
            recipePlatform,
            fitnessTracker,
            studyPlanner,
        ] = projects;

        await UpdateModel.insertMany([
            {
                title: "Task creation implemented",
                description: "Users can now create and edit tasks.",
                project_id: taskManager._id,
                contributor_id: bob._id,
            },
            {
                title: "Weather API selected",
                description: "The project will use an external weather API.",
                project_id: weatherDashboard._id,
                contributor_id: alice._id,
            },
            {
                title: "Recipe model designed",
                description: "The initial recipe and ingredient structure is complete.",
                project_id: recipePlatform._id,
                contributor_id: diana._id,
            },
            {
                title: "Workout tracking completed",
                description: "Workout creation and progress tracking are implemented.",
                project_id: fitnessTracker._id,
                contributor_id: eve._id,
            },
            {
                title: "Project archived",
                description: "The study planner prototype has been archived.",
                project_id: studyPlanner._id,
                contributor_id: charlie._id,
            },
        ]);

        console.log("Seed completed successfully");
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await connection.close();
        console.log("DONE");
    }
}

await seed();
