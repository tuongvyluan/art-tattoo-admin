import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = await asyncParse(req);
    res.status(200).json({ result });
  }
}
