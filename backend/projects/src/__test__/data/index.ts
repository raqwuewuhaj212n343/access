import { Types } from "mongoose";

export const prBody = {
    user: "645f19064c45824a3702320d",
    title: "web design and development",
    description:
        "Modern, user-friendly school portal design offering seamless navigation, intuitive interface, real-time updates, and interactive features. Enhance communication, streamline administrative tasks, and empower students, parents, and staff with an engaging web experience. Access grades, schedules, assignments, attendance records, and more, all in one centralized platform. Experience the convenience and efficiency of our school portal solution tailored to meet the unique needs of educational institutions. Unlock the potential of digital learning and collaboration with our cutting-edge web design for a dynamic school community.",
    requirements: ["School Address", "School Logo", "School Email Address"],
    minPrice: 900,
    days: 70,
    subCategory: "Portal",
    priceRange: {
        min: 20,
        max: 22,
    },
};

export const userId = new Types.ObjectId();

export const paramsId = new Types.ObjectId();