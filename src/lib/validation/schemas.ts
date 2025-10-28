/**
 * Zod Validation Schemas
 * Comprehensive input validation for all forms across the application
 */

import { z } from 'zod';

// ============================================
// USER & PROFILE SCHEMAS
// ============================================

export const profileSchema = z.object({
  username: z.string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores'),
  full_name: z.string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .optional(),
  bio: z.string()
    .trim()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  avatar_url: z.string()
    .url('Invalid URL format')
    .max(500, 'URL must be less than 500 characters')
    .optional(),
});

// ============================================
// CONTACT & INQUIRY SCHEMAS
// ============================================

export const inquirySchema = z.object({
  full_name: z.string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  mobile_number: z.string()
    .trim()
    .max(20, 'Mobile number must be less than 20 characters')
    .regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  subject: z.enum(['general_inquiry', 'technical_support', 'partnership', 'other'], {
    errorMap: () => ({ message: 'Please select a valid subject' })
  }),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

export const feedbackSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  feedback_type: z.enum(['bug', 'feature_request', 'general', 'complaint', 'other'], {
    errorMap: () => ({ message: 'Please select a valid feedback type' })
  }),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  rating: z.number()
    .int()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .optional(),
});

// ============================================
// DISCUSSION & COMMENT SCHEMAS
// ============================================

export const discussionSchema = z.object({
  title: z.string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z.string()
    .trim()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  stock_symbol: z.string()
    .trim()
    .max(10, 'Stock symbol must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Stock symbol must be uppercase letters and numbers only')
    .optional()
    .or(z.literal('')),
});

export const commentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Comment cannot be empty')
    .max(2000, 'Comment must be less than 2000 characters'),
});

// ============================================
// STOCK & PORTFOLIO SCHEMAS
// ============================================

export const stockSchema = z.object({
  symbol: z.string()
    .trim()
    .min(1, 'Stock symbol is required')
    .max(10, 'Symbol must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Symbol must be uppercase letters and numbers'),
  company_name: z.string()
    .trim()
    .max(200, 'Company name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  notes: z.string()
    .trim()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

// ============================================
// EVENT SCHEMAS
// ============================================

export const eventSchema = z.object({
  title: z.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  event_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, 'Invalid date format'),
  location: z.string()
    .trim()
    .max(500, 'Location must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  max_attendees: z.number()
    .int()
    .positive('Max attendees must be a positive number')
    .max(100000, 'Max attendees cannot exceed 100,000')
    .optional(),
  price: z.number()
    .nonnegative('Price cannot be negative')
    .max(1000000, 'Price cannot exceed 1,000,000')
    .optional(),
});

// ============================================
// CHAT & MESSAGING SCHEMAS
// ============================================

export const chatMessageSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters'),
  room_id: z.string()
    .uuid('Invalid room ID'),
});

export const createRoomSchema = z.object({
  name: z.string()
    .trim()
    .min(3, 'Room name must be at least 3 characters')
    .max(100, 'Room name must be less than 100 characters'),
  description: z.string()
    .trim()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  is_private: z.boolean().optional(),
});

// ============================================
// POLL SCHEMAS
// ============================================

export const pollSchema = z.object({
  question: z.string()
    .trim()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must be less than 500 characters'),
  options: z.array(
    z.string()
      .trim()
      .min(1, 'Option cannot be empty')
      .max(200, 'Option must be less than 200 characters')
  )
    .min(2, 'Poll must have at least 2 options')
    .max(10, 'Poll cannot have more than 10 options'),
  expires_at: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, 'Invalid date format')
    .optional(),
});

// ============================================
// ADMIN & MODERATION SCHEMAS
// ============================================

export const userRoleSchema = z.object({
  user_id: z.string()
    .uuid('Invalid user ID'),
  role: z.enum(['user', 'moderator', 'admin', 'super_admin'], {
    errorMap: () => ({ message: 'Invalid role' })
  }),
});

export const moderationActionSchema = z.object({
  target_id: z.string()
    .uuid('Invalid target ID'),
  action_type: z.enum(['warn', 'mute', 'ban', 'delete'], {
    errorMap: () => ({ message: 'Invalid action type' })
  }),
  reason: z.string()
    .trim()
    .min(10, 'Reason must be at least 10 characters')
    .max(1000, 'Reason must be less than 1000 characters'),
  duration_hours: z.number()
    .int()
    .positive('Duration must be a positive number')
    .max(8760, 'Duration cannot exceed 1 year (8760 hours)')
    .optional(),
});

// ============================================
// UTILITY VALIDATORS
// ============================================

export const uuidSchema = z.string().uuid('Invalid ID format');

export const emailSchema = z.string()
  .trim()
  .email('Invalid email address')
  .max(255, 'Email must be less than 255 characters');

export const urlSchema = z.string()
  .url('Invalid URL format')
  .max(2000, 'URL must be less than 2000 characters');

export const dateStringSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

/**
 * Helper function to safely validate data
 * Returns { success: true, data } or { success: false, error }
 */
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  } else {
    return {
      success: false as const,
      error: result.error.errors[0].message,
      errors: result.error.errors,
    };
  }
}
