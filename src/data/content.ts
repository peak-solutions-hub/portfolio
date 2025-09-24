export interface MemberItem {
  name: string;
  role: string;
  img: string;
  bio: string;
}

export interface ProjectItem {
  title: string;
  summary: string;
  description: string;
}

export const members: MemberItem[] = [
  {
    name: "Jose Arron Franz Suoberon",
    role: "Member/leader",
    img: "/members/jose.jpg",
    bio: "😮",
  },
  {
    name: "Michael Jay Constantino",
    role: "CS Student",
    img: "/members/mich.jpg",
    bio: "Joshua Samenian",
  },
  {
    name: "Floyd Matthew Torrechilla",
    role: "adonis bar model",
    img: "/members/floyd.jpeg",
    bio: "No bio (literally, hehehehh :D)",
  },
  {
    name: "Dainz Andrei Trasadas",
    role: "Project Manager",
    img: "/members/dainz.jpg",
    bio: "Ragebaiter edgelord rizzmaster",
  },

  {
    name: "Nicholae Sara",
    role: "Ambassador/Import",
    img: "/members/nich.jpg",
    bio: "Creator of Charlie Kirk AI",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Notetube",
    summary: "an ai powered notes app",
    description: "",
  },
  {
    title: "JurisEase",
    summary: "legal case tracking system",
    description: "",
  },
  {
    title: "Concrete Works Testing Records Management System",
    summary: "a management system for concrete testing currently used by DPWH",
    description: "",
  },
  {
    title: "Hi-Five Co-working Space Management System",
    summary: "",
    description: "",
  },
  {
    title: "Vicmar Fleet Management System",
    summary: "",
    description: "",
  },
];
