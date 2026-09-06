import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;

  const hash = await bcrypt.hash('password123', 12);

  const student = await prisma.user.create({ data: { email: 'student@ac.in', password: hash, name: 'Priya Sharma', role: 'student', dept: 'CSE', university: 'IIT Delhi', year: '3rd Year', cgpa: '8.7', avatar: 'PS' } });
  const faculty = await prisma.user.create({ data: { email: 'prof@ac.in', password: hash, name: 'Dr. Meera Krishnan', role: 'faculty', dept: 'Computer Science', university: 'IIT Delhi', avatar: 'MK' } });
  const industry = await prisma.user.create({ data: { email: 'hr@techcorp.com', password: hash, name: 'Arjun Mehta', role: 'industry', company: 'TechCorp Solutions', dept: 'Talent Acquisition', avatar: 'AM' } });
  const institution = await prisma.user.create({ data: { email: 'admin@ac.in', password: hash, name: 'Dr. Vikram Patel', role: 'institution', university: 'IIT Delhi', dept: 'Administration', avatar: 'VP' } });

  const skills = [
    { skillName: 'Python', score: 78, category: 'Programming' },
    { skillName: 'JavaScript', score: 65, category: 'Programming' },
    { skillName: 'React.js', score: 72, category: 'Frontend' },
    { skillName: 'SQL', score: 58, category: 'Database' },
    { skillName: 'Machine Learning', score: 45, category: 'AI/ML' },
    { skillName: 'Data Analysis', score: 62, category: 'Data Science' },
    { skillName: 'Node.js', score: 55, category: 'Backend' },
    { skillName: 'Git', score: 80, category: 'Tools' },
    { skillName: 'Docker', score: 40, category: 'DevOps' },
    { skillName: 'AWS', score: 35, category: 'Cloud' },
  ];
  for (const s of skills) {
    await prisma.userSkill.create({ data: { userId: student.id, ...s } });
  }

  const opps = [
    { title: 'Software Development Intern', type: 'internship', company: 'TechCorp Solutions', location: 'Bangalore', duration: '3 months', stipend: '₹25,000/mo', skills: ['Python', 'JavaScript', 'Git'], description: 'Work on real-time REST API and frontend projects.', deadline: new Date(Date.now() + 15 * 86400000), spots: 10, creatorId: industry.id },
    { title: 'Data Science Intern', type: 'internship', company: 'DataFlow Analytics', location: 'Hyderabad', duration: '6 months', stipend: '₹30,000/mo', skills: ['Python', 'Machine Learning', 'SQL'], description: 'Build ML models for client analytics dashboards.', deadline: new Date(Date.now() + 20 * 86400000), spots: 5, creatorId: industry.id },
    { title: 'Junior Full Stack Developer', type: 'job', company: 'InnovateLabs', location: 'Pune', duration: 'Full-time', stipend: '₹8-12 LPA', skills: ['React.js', 'Node.js', 'SQL'], description: 'Join product team for next-gen SaaS apps.', deadline: new Date(Date.now() + 30 * 86400000), spots: 8, creatorId: industry.id },
    { title: 'Cloud Engineering Apprentice', type: 'apprenticeship', company: 'CloudNine Systems', location: 'Mumbai', duration: '12 months', stipend: '₹20,000/mo', skills: ['AWS', 'Docker', 'Git'], description: 'Hands-on cloud infrastructure and CI/CD.', deadline: new Date(Date.now() + 25 * 86400000), spots: 15, creatorId: industry.id },
    { title: 'IoT Smart Energy Project', type: 'project', company: 'GreenTech Energy', location: 'Chennai', duration: '4 months', stipend: '₹15,000/mo', skills: ['Python', 'Machine Learning'], description: 'Build IoT sensors for energy optimization.', deadline: new Date(Date.now() + 18 * 86400000), spots: 3, creatorId: industry.id },
  ];
  for (const o of opps) {
    await prisma.opportunity.create({ data: o });
  }

  const events = [
    { title: 'Guest Lecture: Future of AI', type: 'lecture', description: 'Industry expert on AI trends and careers.', date: new Date(Date.now() + 5 * 86400000), time: '3:00 PM', mode: 'online', speaker: 'Dr. Ravi Shankar', capacity: 200, hostId: industry.id },
    { title: 'Industry-Ready Web Dev Workshop', type: 'workshop', description: 'Hands-on production-ready web apps.', date: new Date(Date.now() + 12 * 86400000), time: '10:00 AM', mode: 'hybrid', speaker: 'Priya Nair', capacity: 100, hostId: industry.id },
    { title: 'Career Guidance Session', type: 'mentorship', description: 'Panel on data science career paths.', date: new Date(Date.now() + 8 * 86400000), time: '4:00 PM', mode: 'online', speaker: 'Panel Discussion', capacity: 150, hostId: industry.id },
  ];
  for (const e of events) {
    await prisma.collabEvent.create({ data: e });
  }

  const programs = [
    { title: 'Advanced Python for Data Science', company: 'TechCorp Solutions', type: 'certification', duration: '8 weeks', mode: 'Online', skills: ['Python', 'Data Analysis'], price: 'Free for students', description: 'Master Python for data science with hands-on projects.', deadline: new Date(Date.now() + 30 * 86400000), creatorId: industry.id },
    { title: 'Machine Learning Bootcamp', company: 'DataFlow Analytics', type: 'training', duration: '12 weeks', mode: 'Online', skills: ['Machine Learning', 'Python'], price: 'Free', description: 'Comprehensive ML bootcamp from basics to deployment.', deadline: new Date(Date.now() + 45 * 86400000), creatorId: industry.id },
  ];
  for (const p of programs) {
    await prisma.learningProgram.create({ data: p });
  }

  const challenges = [
    { title: 'AI for Social Good Hackathon', type: 'hackathon', description: 'Build AI solutions for social challenges. 48-hour sprint.', prize: '₹5,00,000 + Internship', deadline: new Date(Date.now() + 20 * 86400000), teamSize: 4, status: 'live', skills: ['Python', 'Machine Learning'], creatorId: industry.id },
    { title: 'Data Science Championship', type: 'hackathon', description: 'Solve business problems using data analytics and ML.', prize: '₹4,00,000 + Job Offer', deadline: new Date(Date.now() + 10 * 86400000), teamSize: 3, status: 'live', skills: ['Python', 'Machine Learning', 'SQL'], creatorId: industry.id },
  ];
  for (const c of challenges) {
    await prisma.challenge.create({ data: c });
  }

  console.log('Seed complete: 4 users, 10 skills, 5 opportunities, 3 events, 2 programs, 2 challenges');
}

main().catch(console.error).finally(() => prisma.$disconnect());
