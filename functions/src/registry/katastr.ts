import { https } from 'firebase-functions/v2';
import { parseStringPromise } from 'xml2js';

/**
 * Katastr (WSDP) lookup — SOAP v29 calls to katastr.cuzk.cz.
 * Supports: getLVByCisloAndKatastr
 *
 * TODO: Port remaining functions from FirebaseFunctions/WSDPcuzk/index.js:
 * - getLVbyAdress
 * - getLVbyParcelniCislo
 * - getPrehledVlastnictviByOsId
 * - getInformaceRizeniByCislo
 */
export const registryKatastr = https.onRequest(
  { region: 'europe-west1', cors: true },
  async (req, res) => {
    const cisloLv = req.query.cisloLv as string;
    const katastr = req.query.katastr as string;

    if (!cisloLv || !katastr) {
      res.status(400).json({ error: 'cisloLv and katastr parameters are required.' });
      return;
    }

    try {
      const soapBody = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:typ="http://katastr.cuzk.cz/read/types/v2.9">
  <soapenv:Body>
    <typ:VratLVByCisloAKatastr>
      <typ:cisloLV>${cisloLv}</typ:cisloLV>
      <typ:kodKU>${katastr}</typ:kodKU>
    </typ:VratLVByCisloAKatastr>
  </soapenv:Body>
</soapenv:Envelope>`;

      const response = await fetch(
        'https://wsdp.cuzk.cz/wsdp/vsPublic/VDPReadSoap.svc',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://katastr.cuzk.cz/read/types/v2.9/VDPRead/VratLVByCisloAKatastr',
          },
          body: soapBody,
        },
      );

      if (!response.ok) {
        res.status(response.status).json({ error: `Katastr WSDP returned ${response.status}` });
        return;
      }

      const xml = await response.text();
      const parsed = await parseStringPromise(xml, { explicitArray: false });

      res.json(parsed);
    } catch (err) {
      res.status(500).json({ error: `Katastr lookup failed: ${err}` });
    }
  },
);
