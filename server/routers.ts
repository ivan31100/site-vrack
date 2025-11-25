import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Content management routers
  concerts: router({
    list: publicProcedure.query(() => db.getConcerts()),
    get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getConcertById(input.id)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.deleteConcert(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        time: z.string().optional(),
        location: z.string(),
        address: z.string().optional(),
        ticketUrl: z.string().optional(),
        imageUrl: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.createConcert(input);
      }),
  }),

  photos: router({
    list: publicProcedure.query(() => db.getPhotos()),
    byCategory: publicProcedure.input(z.object({ category: z.string() })).query(({ input }) => db.getPhotosByCategory(input.category)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.deletePhoto(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string(),
        imageUrl: z.string(),
        imageKey: z.string(),
        thumbnailUrl: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.createPhoto(input);
      }),
  }),

  albums: router({
    list: publicProcedure.query(() => db.getAlbums()),
    get: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getAlbumById(input.id)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.deleteAlbum(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        releaseYear: z.number(),
        spotifyId: z.string().optional(),
        spotifyUrl: z.string().optional(),
        coverImageUrl: z.string().optional(),
        coverImageKey: z.string().optional(),
        trackCount: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.createAlbum(input);
      }),
  }),

  videos: router({
    list: publicProcedure.query(() => db.getVideos()),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.deleteVideo(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        youtubeId: z.string(),
        youtubeUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return db.createVideo(input);
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        return db.createContactSubmission(input);
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return db.getContactSubmissions();
    }),
  }),

  files: router({
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(),
        mimeType: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const fileKey = `uploads/${ctx.user?.id}/${Date.now()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, input.fileData, input.mimeType);
        return db.createFileUpload({
          userId: ctx.user?.id || 0,
          fileName: input.fileName,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSize: input.fileData.length,
        });
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserFileUploads(ctx.user?.id || 0);
    }),
  }),
});

export type AppRouter = typeof appRouter;
