import { https } from 'firebase-functions/v2';

/**
 * RUIAN lookup — search address points via ČÚZK ArcGIS REST service.
 * Source: ags.cuzk.cz
 */
export const registryRuian = https.onRequest(
  { region: 'europe-west1', cors: true },
  async (req, res) => {
    const address = req.query.address as string;

    if (!address) {
      res.status(400).json({ error: 'Address parameter is required.' });
      return;
    }

    try {
      const params = new URLSearchParams({
        f: 'json',
        where: `NAZEV_ULICE LIKE '%${address.replace(/'/g, "''")}%'`,
        outFields: 'NAZEV_ULICE,CISLO_DOMOVNI,PSC,NAZEV_OBCE,KOD_ADM',
        returnGeometry: 'false',
        resultRecordCount: '20',
      });

      const response = await fetch(
        `https://ags.cuzk.cz/arcgis/rest/services/RUIAN/Vyhledavaci_sluzba_nad_daty_RUIAN/MapServer/0/query?${params}`,
      );

      if (!response.ok) {
        res.status(response.status).json({ error: `RUIAN returned ${response.status}` });
        return;
      }

      const data = await response.json() as { features?: Array<{ attributes: Record<string, string> }> };

      const results = (data.features || []).map((f) => ({
        adresa: `${f.attributes.NAZEV_ULICE} ${f.attributes.CISLO_DOMOVNI}, ${f.attributes.PSC} ${f.attributes.NAZEV_OBCE}`,
        kod: f.attributes.KOD_ADM,
      }));

      res.json({ results });
    } catch (err) {
      res.status(500).json({ error: `RUIAN lookup failed: ${err}` });
    }
  },
);
