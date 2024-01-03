import { SuperMemoGrade } from "supermemo";
import * as z from "zod";

const DeckSettingsSchema = z.object({
  newCards: z.number(),
  reviewCards: z.number(),
  isPublic: z.boolean(),
});

export const DeckShema = z.object({
  deckName: z.string(),
  owner: z.string(),
  deckImage: z.string(),
  deckImageName: z.string(),
  blurhash: z.string(),
  tag: z.array(z.string()),
  aiAssist: z.boolean(),
});

export const cardShema = z.object({
  front: z.string(),
  back: z.string(),
  status: z.enum(["new", "reviewed"]),

  interval: z.string(),
  repetition: z.number(),
  efactor: z.number(),

  createdAt: z.date(),
  reviewedDate: z.date(),
  dueDate: z.date(),

  deckImage: z.string(),
  deckImageName: z.string(),
  blurhash: z.string(),
});

export const ImageFileSchema = z.object({
  deckImageFile: z.object({
    data: z.any(),
    name: z.string(),
    mimetype: z.string(),
  }),
});

export const DeckInputSchema = z.object({
  body: DeckShema.pick({
    deckName: true,
    aiAssist: true,
    blurhash: true,
  }).merge(DeckSettingsSchema),
});

export const GetTaskInputSchema = z.object({
  params: z.object({
    deckId: z.string(),
  }),
});

export const GradeCardInputSchema = z.object({
  body: z.object({
    grade: z.number().min(0).max(5),
  }),
});

export type DeckSettingsType = z.infer<typeof DeckSettingsSchema>;
export type DeckType = z.infer<typeof DeckShema>;
export type DeckInputType = Pick<
  DeckType,
  "owner" | "deckName" | "aiAssist" | "blurhash"
> &
  DeckSettingsType &
  Partial<ImageFileType>;
export type CardType = z.infer<typeof cardShema>;
export type CardInputType = Pick<CardType, "front" | "back">;
export type GradeCardInput = {
  deckId: string;
  cardId: string;
  grade: number;
};

export type ImageFileType = z.infer<typeof ImageFileSchema>;
