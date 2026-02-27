import { https } from 'firebase-functions/v2';

interface AresResponse {
  ico: string;
  nazev: string;
  sidlo: string;
}

/**
 * ARES lookup — get company info by IČO.
 * Source: ares.gov.cz REST API
 */
export const registryAres = https.onRequest(
  { region: 'europe-west1', cors: true },
  async (req, res) => {
    const ico = req.query.ico as string;

    if (!ico || !/^\d{8}$/.test(ico)) {
      res.status(400).json({ error: 'Invalid IČO. Must be 8 digits.' });
      return;
    }

    try {
      const response = await fetch(
        `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`,
      );

      if (!response.ok) {
        res.status(response.status).json({ error: `ARES returned ${response.status}` });
        return;
      }

      const data = await response.json() as Record<string, unknown>;
      const sidlo = data.sidlo as Record<string, string> | undefined;

      const result: AresResponse = {
        ico: String(data.ico ?? ''),
        nazev: String(data.obchodniJmeno ?? data.nazev ?? ''),
        sidlo: sidlo
          ? `${sidlo.nazevUlice || ''} ${sidlo.cisloDomovni || ''}/${sidlo.cisloOrientacni || ''}, ${sidlo.psc || ''} ${sidlo.nazevObce || ''}`
          : '',
      };

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: `ARES lookup failed: ${err}` });
    }
  },
);
