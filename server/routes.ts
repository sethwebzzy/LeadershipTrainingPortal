import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema, insertContactSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // In a real app, you'd check against database with hashed passwords
      // For demo purposes, using hardcoded admin credentials
      if (username === "admin" && password === "admin123") {
        const adminUser = {
          id: 1,
          username: "admin",
          password: "admin123" // In real app, this would be hashed
        };
        
        // In a real app, you'd generate a proper JWT token
        const token = "demo-jwt-token";
        
        res.json({ 
          success: true, 
          user: { id: adminUser.id, username: adminUser.username }, 
          token 
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Student registration endpoint
  app.post("/api/students", async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(studentData);
      res.json({ success: true, student });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid student data", details: error.errors });
      }
      console.error("Error creating student:", error);
      res.status(500).json({ error: "Failed to create student registration" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Get all students (for admin purposes)
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
