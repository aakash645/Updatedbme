import { z } from 'zod';
import { insertInquirySchema, inquiries, announcements, events, team, circulars, gallery } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  announcements: {
    list: {
      method: 'GET' as const,
      path: '/api/announcements' as const,
      responses: {
        200: z.array(z.custom<typeof announcements.$inferSelect>()),
      },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  team: {
    list: {
      method: 'GET' as const,
      path: '/api/team' as const,
      responses: {
        200: z.array(z.custom<typeof team.$inferSelect>()),
      },
    },
  },
  circulars: {
    list: {
      method: 'GET' as const,
      path: '/api/circulars' as const,
      responses: {
        200: z.array(z.custom<typeof circulars.$inferSelect>()),
      },
    },
  },
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery' as const,
      responses: {
        200: z.array(z.custom<typeof gallery.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type InquiryInput = z.infer<typeof api.inquiries.create.input>;
