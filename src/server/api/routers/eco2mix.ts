import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eco2mixSchema = z.object({
  nhits: z.number().optional(),
  parameters: z.object({
    dataset: z.string().optional(),
    rows: z.number().optional(),
    start: z.number().optional(),
    sort: z.array(z.string()),
    facet: z.array(z.string()),
    format: z.string().optional(),
    timezone: z.string().optional(),
    refine: z
      .object({ heure: z.string().optional(), date: z.string().optional() })
      .optional(),
  }),
  records: z.array(
    z.object({
      datasetid: z.string().optional(),
      recordid: z.string().optional(),
      fields: z.object({
        solaire: z.number().optional(),
        tch_solaire: z.number().optional(),
        bioenergies: z.number().optional(),
        thermique: z.number().optional(),
        libelle_region: z.string().optional(),
        eolien_terrestre: z.string().optional(),
        heure: z.string().optional(),
        pompage: z.string().optional(),
        eolien: z.number().optional(),
        code_insee_region: z.string().optional(),
        consommation: z.number().optional(),
        tch_thermique: z.number().optional(),
        tch_hydraulique: z.number().optional(),
        tch_bioenergies: z.number().optional(),
        tco_hydraulique: z.number().optional(),
        tco_solaire: z.number().optional(),
        hydraulique: z.number().optional(),
        date_heure: z.string().optional(),
        stockage_batterie: z.number().optional(),
        destockage_batterie: z.string().optional(),
        nature: z.string().optional(),
        eolien_offshore: z.string().optional(),
        date: z.string().optional(),
        tco_eolien: z.number().optional(),
        tco_bioenergies: z.number().optional(),
        tch_eolien: z.number().optional(),
        tco_thermique: z.number().optional(),
      }),
      record_timestamp: z.string().optional(),
    })
  ),
  facet_groups: z
    .array(
      z.object({
        name: z.string().optional(),
        facets: z.array(
          z.object({
            name: z.string().optional(),
            count: z.number().optional(),
            state: z.string().optional(),
            path: z.string().optional(),
          })
        ),
      })
    )
    .optional(),
});

export const eco2MixRouter = createTRPCRouter({
  getForDateTime: publicProcedure
    .input(z.object({ date: z.string(), fromHour: z.string() }))
    .query(async ({ input }) => {
      const url = `https://odre.opendatasoft.com/api/records/1.0/search/?dataset=eco2mix-regional-tr&q=&rows=20&sort=date_heure&facet=libelle_region&facet=nature&facet=date_heure&refine.date=${input.date}&refine.heure=${input.fromHour}&timezone=Europe%2FParis`;
      const response = await fetch(url);
      const parsedData = eco2mixSchema.parse(await response.json());
      return parsedData;
    }),

  getForDate: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const url = `https://odre.opendatasoft.com/api/records/1.0/search/?dataset=eco2mix-regional-tr&q=&rows=20&sort=heure&facet=libelle_region&facet=nature&facet=date_heure&refine.date=${input.date}&timezone=Europe%2FParis`;
      const response = await fetch(url);
      const parsedData = eco2mixSchema.parse(await response.json());
      return parsedData;
    }),
});
