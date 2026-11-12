/** Personal portfolio content. Leave unknown URLs empty until confirmed. */
export const profile = {
  name: 'Ivan B. Tuazon',
  firstName: 'Ivan',
  initials: 'IT',
  image: '/profile-temp.jpg',
  role: 'IT Student | Aspiring Web Developer',
  location: 'Philippines',
  availability: 'Learning, building & exploring new opportunities',
  email: '',
  github: '',
  linkedin: '',
  resume: '',
  intro: 'I want to create games, build useful apps, and turn exciting ideas into experiences people can enjoy.',
  description: 'I’m an Information Technology student specializing in Business Analytics at Laguna University. I enjoy exploring programming, experimenting with new technologies, and learning how to make ideas work. My goal is to grow as a developer, especially in game development and application development, while continuously improving my skills through hands-on projects.',
}
export type Project = {
  number: string; title: string; eyebrow: string; description: string;
  tags: string[]; category: 'Web application' | 'Business system' | 'Analytics';
  image: 'lasfamilias'; github?: string; demo?: string;
}
export const projects: Project[] = [
  {
    number: '01',
    title: 'Las Familias',
    eyebrow: 'RESORT MANAGEMENT · WEB APPLICATION',
    description: 'A resort management application with guest reservations, booking management, check-in and check-out workflows, rental inventory, and financial reporting features.',
    tags: ['Flutter', 'Dart', 'Supabase', 'Reservations'],
    category: 'Web application',
    image: 'lasfamilias',
  },
]
export const skillGroups = [
  { category: 'Programming', skills: ['PHP', 'Python', 'Java', 'JavaScript', 'Dart'] },
  { category: 'App & web development', skills: ['Flutter', 'React (learning)', 'HTML', 'CSS'] },
  { category: 'Tools & interests', skills: ['Git & GitHub', 'Supabase', 'Game Development (exploring)', 'Application Development'] },
]
export const experience = [
  {
    time: 'Current',
    title: 'BS Information Technology',
    organization: 'Laguna University · Business Analytics',
    detail: 'Studying programming, application development, and business analytics while developing practical technical skills.',
  },
  {
    time: 'Project',
    title: 'Las Familias',
    organization: 'Resort Management Application',
    detail: 'A software project exploring reservation operations, guest management, inventory, and reporting workflows.',
  },
]