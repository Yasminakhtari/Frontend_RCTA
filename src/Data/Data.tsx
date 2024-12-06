import { IconUserPlus, IconTarget, IconTrophy, IconChartLine, IconAward } from "@tabler/icons-react";
const clubs: string[] = ["club1", "club7", "club3", "club4", "club5", "club6", "club7", "club8"];
const coachess: string[] = ["coach1", "coach2", "coach3", "coach4", "coach5", "coach6", "coach7", "coach8", "coach9", "coach10"];
const achievements: string[] = ["achievement1", "achievement2", "achievement3", "achievement4", "achievement5", "achievement6", "achievement7", "achievement8", "achievement9"];
const students: string[] = ["tp1", "tp2", "tp3", "tp4", "tp5", "tp6", "tp7", "tp8", "tp9", "tp10", "tp11", "tp12", "tp13", "tp14", "tp15", "tp16"];

const testimonials = [
    {
        "name": "Riya Patel",
        "role": "Player", // Added role
        "testimonial": "The club’s facilities are top-notch! I feel like a pro every time I play here.",
        "rating": 5
    },
    {
        "name": "Sonu Verma",
        "role": "Player", // Added role
        "testimonial": "From beginner lessons to advanced training, this club offers everything a player needs.",
        "rating": 4
    },
    {
        "name": "Purnam Gupta",
        "role": "Player", // Added role
        "testimonial": "Great environment and friendly members. It’s my go-to place for tennis practice!",
        "rating": 4
    },
    {
        "name": "Sneha Malhotra",
        "role": "Parent", // Added role
        "testimonial": "As a parent, I appreciate how well the junior program is structured. My child loves it here!",
        "rating": 5
    }
];

const footerLinks = [
    {
        title: "Programs",
        links: [{val:"Training Programs", url:''},{val: "Youth Academy",url:''},{val: "Adult Coaching",url:''},{ val:"Tournaments",url:''}],

    },
    {
        title: "Academy",
        links: [{val: "About us",url: '/about-us'}, {val:"Our Coaches", url:''}, {val:"Facilities", url:''},{val: "Membership", url:''}]
    },
    {
        title: "Support",
        links: [{val:"Contact Us", url:'contact-us'}, {val:"FAQs", url:''},{ val:"Health & Safety", url:''}, {val:"Terms & Conditions", url:''}]
    }
];


const tennisSteps = [
    {
        name: "Join the Academy",
        desc: "Enroll in our tennis academy to start your journey.",
        icon: IconUserPlus
    },
    {
        name: "Develop Your Skills",
        desc: "Train with expert coaches and improve your techniques.",
        icon: IconTarget
    },
    {
        name: "Participate in Tournaments",
        desc: "Compete in tournaments to gain experience and showcase your talent.",
        icon: IconTrophy
    },
    {
        name: "Track Your Progress",
        desc: "Monitor your growth and set new goals with regular assessments.",
        icon: IconChartLine
    },
    {
        name: "Earn Recognition",
        desc: "Achieve milestones and earn certificates for your progress.",
        icon: IconAward
    }
];

const coaches = [
    {
        name: "Rafael Carbungco",
        title: "Owner/Head Coach",
        avatar: "",
        bio: "An experienced coach with over 20 years in the tennis world, specializing in advanced techniques."
    },
    {
        name: "Jaya sethy",
        title: "Assistant Coach",
        avatar: "",
        bio: "Passionate about training new talent and building strong fundamentals in young players."
    },
    {
        name: "jame underson",
        title: "Fitness Coach",
        avatar: "",
        bio: "Focused on physical conditioning to help athletes stay in peak form and prevent injuries."
    },
];

// Data for Journey Timeline
const journey = [
    { year: "2015", description: "Founded the tennis academy with a mission to nurture talent." },
    { year: "2017", description: "Launched our first major tournament with players from all over the region." },
    { year: "2019", description: "Expanded facilities with 5 additional courts and training equipment." },
    { year: "2021", description: "Introduced a junior program that attracted 200+ young players." },
    { year: "2023", description: "Our players won 10+ regional championships." },
];

export { clubs, testimonials, footerLinks, tennisSteps, coaches, journey, students, coachess, achievements };