import { IconUserPlus, IconTarget, IconTrophy, IconChartLine, IconAward } from "@tabler/icons-react";
const clubs : string[]= ["club1", "club7", "club3", "club4", "club5", "club6", "club7", "club8"];

const testimonials = [
    {
        "name": "Riya Patel",
        "testimonial": "The club’s facilities are top-notch! I feel like a pro every time I play here.",
        "rating": 5
    },
    {
        "name": "Sonu Verma",
        "testimonial": "From beginner lessons to advanced training, this club offers everything a player needs.",
        "rating": 4
    },
    {
        "name": "Purnam Gupta",
        "testimonial": "Great environment and friendly members. It’s my go-to place for tennis practice!",
        "rating": 4
    },
    {
        "name": "Sneha Malhotra",
        "testimonial": "As a parent, I appreciate how well the junior program is structured. My child loves it here!",
        "rating": 5
    }   
];

const footerLinks = [
    { 
        title: "Programs", 
        links: ["Training Programs", "Youth Academy", "Adult Coaching", "Tournaments"] 
    },
    { 
        title: "Academy", 
        links: ["About Us", "Our Coaches", "Facilities", "Membership"] 
    },
    { 
        title: "Support", 
        links: ["Contact Us", "FAQs", "Health & Safety", "Terms & Conditions"] 
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

export {clubs,testimonials,footerLinks,tennisSteps,coaches,journey};