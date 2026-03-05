import axios from "axios";
import { Profile, Project, Skill, ContactForm } from "@/types";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfile = async (): Promise<Profile> => {
  const { data } = await client.get("/api/profile/");
  return data;
};

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await client.get("/api/projects/");
  return data;
};

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await client.get("/api/skills/");
  return data;
};

export const sendContact = async (form: ContactForm): Promise<void> => {
  await client.post("/api/contact/", form);
};
