export const students = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    avatar: "PS",
    university: "Indian Institute of Technology, Delhi",
    degree: "B.Tech in Computer Science",
    year: 3,
    cgpa: 8.7,
    careerGoal: "Data Analyst",
    skills: [
      { name: "Python", level: "advanced", verified: true, assessmentScore: 88 },
      { name: "Excel", level: "expert", verified: true, assessmentScore: 95 },
      { name: "SQL", level: "intermediate", verified: true, assessmentScore: 62 },
      { name: "Power BI", level: "beginner", verified: false, assessmentScore: 35 },
      { name: "Machine Learning", level: "intermediate", verified: true, assessmentScore: 71 },
      { name: "Communication", level: "advanced", verified: false, assessmentScore: 82 },
      { name: "Statistics", level: "advanced", verified: true, assessmentScore: 85 },
      { name: "Data Visualization", level: "intermediate", verified: true, assessmentScore: 68 }
    ],
    certifications: [
      { name: "Google Data Analytics Professional Certificate", issuer: "Google", date: "2025-08-15", verified: true },
      { name: "Python for Data Science", issuer: "IBM", date: "2025-06-20", verified: true },
      { name: "Advanced Excel", issuer: "Coursera", date: "2025-04-10", verified: true }
    ],
    projects: [
      { name: "Sales Dashboard Analysis", description: "Built interactive dashboards analyzing sales trends", skills: ["Python", "Excel", "Data Visualization"], date: "2025-09-01" },
      { name: "Customer Segmentation", description: "ML model for customer behavior analysis", skills: ["Python", "Machine Learning", "Statistics"], date: "2025-07-15" }
    ],
    internships: [
      { company: "TechCorp India", role: "Data Analytics Intern", duration: "3 months", startDate: "2025-06-01", endDate: "2025-08-31", status: "completed", feedback: "Excellent analytical skills" }
    ],
    assessments: [
      { name: "Python Assessment", score: 88, date: "2025-09-01" },
      { name: "SQL Assessment", score: 62, date: "2025-09-01" },
      { name: "Excel Assessment", score: 95, date: "2025-08-28" },
      { name: "Power BI Assessment", score: 35, date: "2025-09-01" }
    ],
    applications: [
      { opportunityId: 1, status: "interview", appliedDate: "2025-09-02" },
      { opportunityId: 3, status: "applied", appliedDate: "2025-09-03" },
      { opportunityId: 5, status: "shortlisted", appliedDate: "2025-09-01" }
    ],
    achievements: ["Dean's List 2025", "Hackathon Winner - TechFest 2025"],
    interests: ["Data Analytics", "Machine Learning", "Business Intelligence"]
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul.verma@email.com",
    avatar: "RV",
    university: "BITS Pilani",
    degree: "B.E. in Information Systems",
    year: 4,
    cgpa: 8.2,
    careerGoal: "Full Stack Developer",
    skills: [
      { name: "JavaScript", level: "advanced", verified: true, assessmentScore: 85 },
      { name: "React", level: "advanced", verified: true, assessmentScore: 82 },
      { name: "Node.js", level: "intermediate", verified: true, assessmentScore: 68 },
      { name: "Python", level: "intermediate", verified: false, assessmentScore: 55 },
      { name: "SQL", level: "intermediate", verified: true, assessmentScore: 65 },
      { name: "HTML/CSS", level: "expert", verified: true, assessmentScore: 92 },
      { name: "Git", level: "advanced", verified: true, assessmentScore: 78 },
      { name: "Communication", level: "intermediate", verified: false, assessmentScore: 60 }
    ],
    certifications: [
      { name: "Meta Front-End Developer Certificate", issuer: "Meta", date: "2025-07-20", verified: true },
      { name: "JavaScript Algorithms", issuer: "freeCodeCamp", date: "2025-05-15", verified: true }
    ],
    projects: [
      { name: "E-commerce Platform", description: "Full-stack e-commerce with React and Node.js", skills: ["React", "Node.js", "JavaScript"], date: "2025-08-20" },
      { name: "Task Management App", description: "Real-time task management with WebSocket", skills: ["React", "Node.js", "SQL"], date: "2025-06-10" }
    ],
    internships: [
      { company: "WebSolutions Pvt Ltd", role: "Frontend Developer Intern", duration: "2 months", startDate: "2025-05-01", endDate: "2025-06-30", status: "completed", feedback: "Strong React skills" }
    ],
    assessments: [
      { name: "JavaScript Assessment", score: 85, date: "2025-09-01" },
      { name: "React Assessment", score: 82, date: "2025-09-01" },
      { name: "Node.js Assessment", score: 68, date: "2025-09-01" },
      { name: "Python Assessment", score: 55, date: "2025-09-01" }
    ],
    applications: [
      { opportunityId: 2, status: "selected", appliedDate: "2025-08-25" },
      { opportunityId: 4, status: "applied", appliedDate: "2025-09-03" }
    ],
    achievements: ["Open Source Contributor", "State Level Coding Competition - 2nd Prize"],
    interests: ["Web Development", "Cloud Computing", "DevOps"]
  },
  {
    id: 3,
    name: "Ananya Patel",
    email: "ananya.patel@email.com",
    avatar: "AP",
    university: "NIT Trichy",
    degree: "B.Tech in Electronics & Communication",
    year: 3,
    cgpa: 9.1,
    careerGoal: "Machine Learning Engineer",
    skills: [
      { name: "Python", level: "expert", verified: true, assessmentScore: 94 },
      { name: "TensorFlow", level: "advanced", verified: true, assessmentScore: 87 },
      { name: "PyTorch", level: "intermediate", verified: true, assessmentScore: 72 },
      { name: "Deep Learning", level: "advanced", verified: true, assessmentScore: 85 },
      { name: "Statistics", level: "expert", verified: true, assessmentScore: 92 },
      { name: "SQL", level: "beginner", verified: false, assessmentScore: 40 },
      { name: "Communication", level: "advanced", verified: false, assessmentScore: 80 },
      { name: "Research", level: "advanced", verified: true, assessmentScore: 88 }
    ],
    certifications: [
      { name: "Deep Learning Specialization", issuer: "Coursera", date: "2025-08-01", verified: true },
      { name: "TensorFlow Developer Certificate", issuer: "Google", date: "2025-06-15", verified: true }
    ],
    projects: [
      { name: "Image Classification Model", description: "CNN model with 95% accuracy on medical images", skills: ["Python", "TensorFlow", "Deep Learning"], date: "2025-08-25" },
      { name: "NLP Sentiment Analysis", description: "Transformer-based sentiment analysis", skills: ["Python", "PyTorch", "Deep Learning"], date: "2025-07-01" }
    ],
    internships: [
      { company: "AI Research Lab", role: "ML Research Intern", duration: "4 months", startDate: "2025-05-15", endDate: "2025-09-15", status: "ongoing", feedback: "Excellent research methodology" }
    ],
    assessments: [
      { name: "Python Assessment", score: 94, date: "2025-09-01" },
      { name: "TensorFlow Assessment", score: 87, date: "2025-09-01" },
      { name: "Deep Learning Assessment", score: 85, date: "2025-09-01" },
      { name: "SQL Assessment", score: 40, date: "2025-09-01" }
    ],
    applications: [
      { opportunityId: 6, status: "shortlisted", appliedDate: "2025-09-02" }
    ],
    achievements: ["Published Research Paper - ICML 2025", "Kaggle Competition - Top 5%"],
    interests: ["Computer Vision", "NLP", "Generative AI"]
  }
];

export const industries = [
  {
    id: 1,
    name: "TechCorp India",
    logo: "TC",
    industry: "Technology",
    size: "5000+ employees",
    location: "Bangalore, India",
    description: "Leading technology company specializing in enterprise solutions",
    openings: 12,
    rating: 4.5
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    logo: "DF",
    industry: "Data Analytics",
    size: "500-1000 employees",
    location: "Mumbai, India",
    description: "Data-driven insights and business intelligence solutions",
    openings: 8,
    rating: 4.3
  },
  {
    id: 3,
    name: "CloudNine Technologies",
    logo: "C9",
    industry: "Cloud Computing",
    size: "1000-5000 employees",
    location: "Hyderabad, India",
    description: "Cloud infrastructure and DevOps solutions provider",
    openings: 15,
    rating: 4.6
  },
  {
    id: 4,
    name: "InnovateLabs",
    logo: "IL",
    industry: "AI/ML",
    size: "200-500 employees",
    location: "Pune, India",
    description: "Cutting-edge AI and machine learning research company",
    openings: 6,
    rating: 4.7
  }
];

export const opportunities = [
  {
    id: 1,
    title: "Data Analyst Intern",
    company: "TechCorp India",
    companyId: 1,
    type: "Internship",
    location: "Bangalore (Hybrid)",
    duration: "6 months",
    stipend: "₹25,000/month",
    description: "Join our analytics team to work on real-time business intelligence dashboards and data-driven decision making.",
    requiredSkills: [
      { name: "Python", required: true, weight: 30 },
      { name: "SQL", required: true, weight: 25 },
      { name: "Excel", required: true, weight: 20 },
      { name: "Power BI", required: false, weight: 15 },
      { name: "Communication", required: true, weight: 10 }
    ],
    eligibility: { minCGPA: 7.0, year: "3rd or 4th year" },
    postedDate: "2025-09-01",
    deadline: "2025-09-30",
    applicants: 45,
    status: "active"
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "CloudNine Technologies",
    companyId: 3,
    type: "Internship",
    location: "Hyderabad (On-site)",
    duration: "6 months",
    stipend: "₹30,000/month",
    description: "Work with our engineering team to build scalable web applications using modern frameworks.",
    requiredSkills: [
      { name: "JavaScript", required: true, weight: 30 },
      { name: "React", required: true, weight: 25 },
      { name: "Node.js", required: true, weight: 25 },
      { name: "SQL", required: false, weight: 10 },
      { name: "Git", required: true, weight: 10 }
    ],
    eligibility: { minCGPA: 7.5, year: "3rd or 4th year" },
    postedDate: "2025-08-28",
    deadline: "2025-09-28",
    applicants: 62,
    status: "active"
  },
  {
    id: 3,
    title: "Business Intelligence Analyst",
    company: "DataFlow Analytics",
    companyId: 2,
    type: "Full-time",
    location: "Mumbai (Hybrid)",
    duration: "Permanent",
    stipend: "₹8-12 LPA",
    description: "Analyze business data and create insightful dashboards for Fortune 500 clients.",
    requiredSkills: [
      { name: "SQL", required: true, weight: 30 },
      { name: "Power BI", required: true, weight: 25 },
      { name: "Excel", required: true, weight: 20 },
      { name: "Python", required: false, weight: 15 },
      { name: "Communication", required: true, weight: 10 }
    ],
    eligibility: { minCGPA: 7.0, year: "Final year or fresh graduate" },
    postedDate: "2025-09-02",
    deadline: "2025-10-15",
    applicants: 28,
    status: "active"
  },
  {
    id: 4,
    title: "React Developer Intern",
    company: "TechCorp India",
    companyId: 1,
    type: "Internship",
    location: "Bangalore (On-site)",
    duration: "3 months",
    stipend: "₹20,000/month",
    description: "Build responsive and performant user interfaces for our enterprise products.",
    requiredSkills: [
      { name: "JavaScript", required: true, weight: 30 },
      { name: "React", required: true, weight: 35 },
      { name: "HTML/CSS", required: true, weight: 20 },
      { name: "Git", required: true, weight: 15 }
    ],
    eligibility: { minCGPA: 6.5, year: "2nd, 3rd or 4th year" },
    postedDate: "2025-09-03",
    deadline: "2025-09-25",
    applicants: 38,
    status: "active"
  },
  {
    id: 5,
    title: "Data Science Apprentice",
    company: "InnovateLabs",
    companyId: 4,
    type: "Apprenticeship",
    location: "Pune (Remote)",
    duration: "12 months",
    stipend: "₹35,000/month",
    description: "Work on cutting-edge ML projects with our research team. Perfect for aspiring data scientists.",
    requiredSkills: [
      { name: "Python", required: true, weight: 30 },
      { name: "Machine Learning", required: true, weight: 30 },
      { name: "Statistics", required: true, weight: 20 },
      { name: "Deep Learning", required: false, weight: 15 },
      { name: "Communication", required: true, weight: 5 }
    ],
    eligibility: { minCGPA: 8.0, year: "3rd or 4th year" },
    postedDate: "2025-08-30",
    deadline: "2025-10-01",
    applicants: 52,
    status: "active"
  },
  {
    id: 6,
    title: "ML Research Intern",
    company: "InnovateLabs",
    companyId: 4,
    type: "Internship",
    location: "Pune (Hybrid)",
    duration: "6 months",
    stipend: "₹40,000/month",
    description: "Contribute to ongoing research projects in computer vision and NLP.",
    requiredSkills: [
      { name: "Python", required: true, weight: 25 },
      { name: "TensorFlow", required: true, weight: 25 },
      { name: "Deep Learning", required: true, weight: 25 },
      { name: "Research", required: true, weight: 15 },
      { name: "Communication", required: true, weight: 10 }
    ],
    eligibility: { minCGPA: 8.5, year: "3rd or 4th year" },
    postedDate: "2025-08-25",
    deadline: "2025-09-20",
    applicants: 35,
    status: "active"
  }
];

export const careerPaths = {
  "Data Analyst": {
    title: "Data Analyst",
    description: "Transform raw data into actionable insights for business decision-making.",
    avgSalary: "₹6-10 LPA",
    growthRate: "25%",
    requiredSkills: [
      { name: "Python", importance: "High", level: "Advanced" },
      { name: "SQL", importance: "High", level: "Advanced" },
      { name: "Excel", importance: "High", level: "Expert" },
      { name: "Power BI", importance: "Medium", level: "Intermediate" },
      { name: "Statistics", importance: "High", level: "Advanced" },
      { name: "Communication", importance: "Medium", level: "Intermediate" },
      { name: "Data Visualization", importance: "Medium", level: "Intermediate" }
    ],
    relatedRoles: ["Business Analyst", "Data Engineer", "BI Developer"]
  },
  "Full Stack Developer": {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications from frontend to backend.",
    avgSalary: "₹8-15 LPA",
    growthRate: "20%",
    requiredSkills: [
      { name: "JavaScript", importance: "High", level: "Advanced" },
      { name: "React", importance: "High", level: "Advanced" },
      { name: "Node.js", importance: "High", level: "Intermediate" },
      { name: "Python", importance: "Medium", level: "Intermediate" },
      { name: "SQL", importance: "Medium", level: "Intermediate" },
      { name: "HTML/CSS", importance: "High", level: "Expert" },
      { name: "Git", importance: "High", level: "Advanced" }
    ],
    relatedRoles: ["Frontend Developer", "Backend Developer", "DevOps Engineer"]
  },
  "Machine Learning Engineer": {
    title: "Machine Learning Engineer",
    description: "Design and deploy ML models to solve complex business problems.",
    avgSalary: "₹10-20 LPA",
    growthRate: "35%",
    requiredSkills: [
      { name: "Python", importance: "High", level: "Expert" },
      { name: "TensorFlow", importance: "High", level: "Advanced" },
      { name: "Deep Learning", importance: "High", level: "Advanced" },
      { name: "Statistics", importance: "High", level: "Expert" },
      { name: "SQL", importance: "Medium", level: "Intermediate" },
      { name: "Communication", importance: "Medium", level: "Intermediate" },
      { name: "Research", importance: "High", level: "Advanced" }
    ],
    relatedRoles: ["Data Scientist", "AI Researcher", "MLOps Engineer"]
  }
};

export const learningResources = [
  { id: 1, title: "Advanced SQL for Data Analysis", type: "Course", provider: "Coursera", duration: "6 weeks", skills: ["SQL"], rating: 4.7, price: "Free" },
  { id: 2, title: "Power BI Masterclass", type: "Workshop", provider: "Udemy", duration: "4 weeks", skills: ["Power BI"], rating: 4.5, price: "₹999" },
  { id: 3, title: "Data Visualization with Python", type: "Course", provider: "edX", duration: "8 weeks", skills: ["Python", "Data Visualization"], rating: 4.6, price: "Free" },
  { id: 4, title: "Business Analytics Certificate", type: "Certification", provider: "Google", duration: "3 months", skills: ["Excel", "SQL", "Power BI"], rating: 4.8, price: "Free" },
  { id: 5, title: "Node.js Backend Development", type: "Course", provider: "freeCodeCamp", duration: "10 weeks", skills: ["Node.js", "JavaScript"], rating: 4.7, price: "Free" },
  { id: 6, title: "React Advanced Patterns", type: "Workshop", provider: "Frontend Masters", duration: "2 weeks", skills: ["React", "JavaScript"], rating: 4.8, price: "₹2,999" },
  { id: 7, title: "Deep Learning Specialization", type: "Course", provider: "Coursera", duration: "4 months", skills: ["Deep Learning", "TensorFlow"], rating: 4.9, price: "Free" },
  { id: 8, title: "ML Ops Certification", type: "Certification", provider: "Google Cloud", duration: "2 months", skills: ["Python", "Machine Learning"], rating: 4.6, price: "Free" }
];

export const collaborations = [
  { id: 1, type: "lecture", title: "Industry Trends in Data Analytics", organization: "DataFlow Analytics", date: "2025-09-15", time: "3:00 PM", mode: "Online", seats: 100, registered: 65 },
  { id: 2, type: "workshop", title: "Building Production ML Models", organization: "InnovateLabs", date: "2025-09-20", time: "10:00 AM", mode: "Hybrid", seats: 50, registered: 42 },
  { id: 3, type: "mentorship", title: "Career Mentoring - Tech Leaders", organization: "TechCorp India", date: "2025-09-25", time: "4:00 PM", mode: "Online", seats: 30, registered: 28 },
  { id: 4, type: "project", title: "Live Project - Smart City Analytics", organization: "CloudNine Technologies", date: "2025-10-01", duration: "3 months", mode: "Hybrid", seats: 20, registered: 15 },
  { id: 5, type: "workshop", title: "Web Development Bootcamp", organization: "TechCorp India", date: "2025-10-05", time: "9:00 AM", mode: "On-site", seats: 40, registered: 35 },
  { id: 6, type: "lecture", title: "AI in Healthcare - Future Prospects", organization: "InnovateLabs", date: "2025-10-10", time: "2:00 PM", mode: "Online", seats: 150, registered: 98 }
];

export const institutionData = {
  name: "Indian Institute of Technology, Delhi",
  totalStudents: 2500,
  activeStudents: 1800,
  placedStudents: 1200,
  internshipsOngoing: 350,
  topSkillGaps: [
    { skill: "SQL", gapStudents: 450, percentage: 45 },
    { skill: "Power BI", gapStudents: 520, percentage: 52 },
    { skill: "Communication", gapStudents: 380, percentage: 38 },
    { skill: "Cloud Computing", gapStudents: 410, percentage: 41 }
  ],
  industryDemand: [
    { skill: "Python", demand: 85 },
    { skill: "SQL", demand: 78 },
    { skill: "React", demand: 72 },
    { skill: "Machine Learning", demand: 68 },
    { skill: "Power BI", demand: 65 },
    { skill: "Communication", demand: 60 }
  ],
  placementStats: {
    totalOffers: 1450,
    avgPackage: "12.5 LPA",
    highestPackage: "45 LPA",
    companiesVisited: 120
  },
  recentActivities: [
    { type: "placement", text: "45 students placed in TechCorp India campus drive", time: "2 days ago" },
    { type: "workshop", text: "Data Analytics workshop conducted by DataFlow Analytics", time: "5 days ago" },
    { type: "internship", text: "Summer internship results published - 350 students placed", time: "1 week ago" },
    { type: "lecture", text: "Guest lecture on AI trends by InnovateLabs CEO", time: "2 weeks ago" }
  ]
};

export const assessmentQuestions = {
  python: [
    { id: 1, question: "What is the output of: print(type([]))?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0 },
    { id: 2, question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], correct: 1 },
    { id: 3, question: "What does 'pip' stand for?", options: ["Python Interface Package", "Pip Installs Packages", "Python Installation Program", "Package Installer for Python"], correct: 3 },
    { id: 4, question: "How do you create a list in Python?", options: ["{}", "[]", "()", "<>"], correct: 1 },
    { id: 5, question: "What is the correct file extension for Python files?", options: [".python", ".py", ".pt", ".pyt"], correct: 1 }
  ],
  sql: [
    { id: 1, question: "Which SQL command is used to retrieve data?", options: ["GET", "SELECT", "FETCH", "RETRIEVE"], correct: 1 },
    { id: 2, question: "What does WHERE clause do?", options: ["Groups records", "Filters records", "Sorts records", "Deletes records"], correct: 1 },
    { id: 3, question: "Which JOIN returns all records from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: 3 },
    { id: 4, question: "What is the purpose of GROUP BY?", options: ["Filter rows", "Group rows with same values", "Sort data", "Delete duplicates"], correct: 1 },
    { id: 5, question: "Which function counts rows in SQL?", options: ["COUNT()", "SUM()", "TOTAL()", "ROWS()"], correct: 0 }
  ],
  javascript: [
    { id: 1, question: "Which symbol is used for single-line comments?", options: ["//", "/*", "#", "--"], correct: 0 },
    { id: 2, question: "How do you declare a variable in JS?", options: ["var", "All of the above", "let", "const"], correct: 1 },
    { id: 3, question: "What does 'DOM' stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Middleware", "Digital Output Mode"], correct: 0 },
    { id: 4, question: "Which method adds element to end of array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
    { id: 5, question: "What is '===' operator?", options: ["Equal", "Strict equal", "Assignment", "Not equal"], correct: 1 }
  ]
};
